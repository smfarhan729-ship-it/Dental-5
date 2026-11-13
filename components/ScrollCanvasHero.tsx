'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Star,
  Activity,
  ArrowDown,
} from 'lucide-react';

interface ScrollCanvasHeroProps {
  onOpenBooking: (type?: 'dental' | 'physio') => void;
  targetRef?: React.RefObject<HTMLElement | null>;
}

const TOTAL_FRAMES = 300;

export default function ScrollCanvasHero({ onOpenBooking, targetRef }: ScrollCanvasHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgressVal, setScrollProgressVal] = useState(0);

  const targetFrameRef = useRef(1);
  const currentRenderedFrameRef = useRef(1);
  const animFrameId = useRef<number | null>(null);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  // Mouse tilt effect for 3D holographic depth
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const x = (e.clientX / clientWidth - 0.5) * 2;
    const y = (e.clientY / clientHeight - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  // Frame preloader: loads key frames immediately for fast interactive readiness, then streams remaining frames
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);
    let count = 0;

    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(3, '0');
        img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
        img.onload = () => {
          if (!isCancelled) {
            loadedImages[index] = img;
            count++;
            if (count >= 10) {
              setIsInitialReady(true);
            }
          }
          if ('decode' in img) {
            img.decode().then(() => resolve(img)).catch(() => resolve(img));
          } else {
            resolve(img);
          }
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Priority 1: Key phase frames and first batch
    const priorityList = [1, 2, 3, 5, 10, 15, 20, 25, 30, 75, 150, 225, 300];
    Promise.all(priorityList.map(loadFrame)).then(() => {
      if (isCancelled) return;
      setImages([...loadedImages]);
      setIsInitialReady(true);

      // Priority 2: Load remaining frames in small batches
      const remainingFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1).filter(
        (i) => !priorityList.includes(i)
      );
      const chunkSize = 25;
      const loadChunks = async () => {
        for (let i = 0; i < remainingFrames.length; i += chunkSize) {
          if (isCancelled) break;
          const chunk = remainingFrames.slice(i, i + chunkSize);
          await Promise.all(chunk.map(loadFrame));
          setImages([...loadedImages]);
        }
      };
      loadChunks();
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Exclusively dynamic, scroll-based animation tracking (no auto-playing video timer)
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ['start start', 'end end'],
        }
      : {}
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgressVal(latest);
      const frame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(latest * (TOTAL_FRAMES - 1)) + 1)
      );
      targetFrameRef.current = frame;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Canvas render loop strictly tracking current scroll position
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const diff = targetFrameRef.current - currentRenderedFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentRenderedFrameRef.current += diff * 0.2;
      } else {
        currentRenderedFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentRenderedFrameRef.current)));

      // Robust fallback ensuring frame is always painted without screen blanking
      let img = images[frameToDraw];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Nearest loaded frame search for continuous high-fidelity rendering
        for (let offset = 1; offset < 25; offset++) {
          const prev = images[frameToDraw - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[frameToDraw + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
        if (!img || !img.complete || img.naturalWidth === 0) {
          img = lastDrawnImgRef.current || images[1];
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        lastDrawnImgRef.current = img;

        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const rect = canvas.getBoundingClientRect();

        const targetWidth = Math.round(rect.width * dpr);
        const targetHeight = Math.round(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill deep obsidian backdrop to eliminate edge artifacts
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        let drawW = canvas.width;
        let drawH = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawW = canvas.width;
          drawH = canvas.width / imgRatio;
          offsetY = (canvas.height - drawH) / 2;
        } else {
          drawH = canvas.height;
          drawW = canvas.height * imgRatio;
          offsetX = (canvas.width - drawW) / 2;
        }

        const parallaxOffsetX = mousePos.x * 8 * dpr;
        const parallaxOffsetY = mousePos.y * 8 * dpr;

        // Pixel-aligned drawing to eliminate subpixel sampling blur
        ctx.drawImage(
          img,
          Math.round(offsetX + parallaxOffsetX),
          Math.round(offsetY + parallaxOffsetY),
          Math.round(drawW),
          Math.round(drawH)
        );
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [images, mousePos]);

  // Determine current active scene based on scrollProgress
  let currentActiveScene = 0;
  if (scrollProgressVal < 0.22) {
    currentActiveScene = 0;
  } else if (scrollProgressVal >= 0.26 && scrollProgressVal < 0.48) {
    currentActiveScene = 1;
  } else if (scrollProgressVal >= 0.52 && scrollProgressVal < 0.74) {
    currentActiveScene = 2;
  } else if (scrollProgressVal >= 0.78) {
    currentActiveScene = 3;
  } else {
    currentActiveScene = -1; // transitional gap for smooth crossfade
  }

  const hasStartedScrolling = scrollProgressVal > 0.03;

  return (
    <div
      className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Rendered Tooth Canvas Background: strictly scroll-driven */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
          filter: 'contrast(1.05) brightness(1.02) saturate(1.04)',
        }}
      />

      {/* Ambient Dark Scrim Vignettes ensuring text legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/75 via-transparent to-slate-950/85" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.65)_100%)]" />

      {/* Initial Loading Screen */}
      {!isInitialReady && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 transition-opacity duration-700">
          <div className="w-12 h-12 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin mb-4" />
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-teal-300 uppercase">
            Preparing Interactive 3D Anatomy...
          </p>
        </div>
      )}

      {/* Synchronized Content Scenes based strictly on Scroll Progress */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-20 pointer-events-none">
        {/* Dynamic Center Stage */}
        <div className="my-auto w-full flex items-center justify-center sm:justify-start">
          <AnimatePresence mode="wait">
            {/* SCENE 0: Initial Hero */}
            {currentActiveScene === 0 && (
              <motion.div
                key="scene-0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-xl text-left pointer-events-auto"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300 tracking-wider uppercase mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>Ansh Dental & Physio Care · Surat</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Micro-Precision <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-cyan-200">
                    Dentistry.
                  </span>
                </h1>

                <p className="mt-4 text-xs sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Founded & directed by Dr. Dipen Patel (B.D.S). Over 10+ years of biomimetic tooth preservation, painless rotary root canals, and permanent implant restorations in Pandesara.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs sm:text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 ★</span>
                    <span className="text-slate-200 font-medium">(160+ Google Reviews)</span>
                  </div>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs sm:text-sm text-slate-200 font-semibold">
                    5.0 ★ on Justdial
                  </span>
                </div>

                {!hasStartedScrolling && (
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-pulse">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Scroll down to rotate 3D anatomy</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCENE 1: Rotary Endodontics & Tooth Preservation */}
            {currentActiveScene === 1 && (
              <motion.div
                key="scene-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-xl text-left pointer-events-auto"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Phase 01 · Structural Integrity
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Enamel to Root. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-teal-200">
                    Sub-Millimeter Mastery.
                  </span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Whether curing severe throbbing toothaches with single-sitting rotary root canal therapy or engineering razor-thin porcelain laminates, every contour matches natural biomechanics.
                </p>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-100 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>Rotary Endodontics for Painless Single-Sitting RCT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>Monolithic High-Translucency Zirconia Crowns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>Low-Radiation Digital RVG Imaging Verification</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 2: Titanium Implant Restorations */}
            {currentActiveScene === 2 && (
              <motion.div
                key="scene-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-xl ml-auto text-left sm:text-right pointer-events-auto"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Phase 02 · Permanent Restoration
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Osseointegrated <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-white">
                    Implant Suite.
                  </span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Grade-V titanium screw fixtures engineered for lifelong bone preservation and chew efficiency. Trusted by local residents and frequent NRI patients visiting Gujarat.
                </p>

                <div className="mt-4 flex flex-col items-start sm:items-end space-y-2 text-xs sm:text-sm text-slate-100 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Guided Flapless & Surgical Implant Planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Immediate Aesthetic Loading with Custom Abutments</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 3: Integrated Care & Consultation CTAs */}
            {currentActiveScene === 3 && (
              <motion.div
                key="scene-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-2xl mx-auto text-center pointer-events-auto"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Phase 03 · Total Harmony
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Smile Aesthetics & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-100 to-white">
                    Physio Rehabilitation.
                  </span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-100 font-medium max-w-lg mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Surat&apos;s integrated center uniting Dr. Dipen Patel (B.D.S) & Dr. Hiral Patel (BPT, MIAP) for dental wellness, TMJ jaw alignment, and physical therapy.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onOpenBooking('dental')}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-teal-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Dental Consultation</span>
                  </button>
                  <button
                    onClick={() => onOpenBooking('physio')}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-cyan-300" />
                    <span>Book Physio Assessment</span>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <a href="tel:+919428677067" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <span>+91 94286 77067</span>
                  </a>
                  <span>·</span>
                  <span>B-42, Utsav Complex, Pandesara, Surat</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
}
