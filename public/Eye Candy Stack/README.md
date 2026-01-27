# 📚 Viron Button: Documentation Index
## Complete Implementation Kit (January 2026)

**Status:** ✅ VERIFIED AGAINST LIVE ECOSYSTEM  
**Last Updated:** January 27, 2026, 5:47 PM CET  
**Project:** Viron Agency — High-End Cinematic UI Button  

---

## 📄 Documentation Files

This package contains **4 comprehensive markdown files** for the Viron Button project:

### 1. **viron-button-guide.md** 📖
**The Core Reference Guide (15,000 words)**

What's included:
- ⚠️ Critical dependency notes (Lamina archived, WebGPU not ready)
- 🏗️ Complete architecture breakdown
- 📦 Dependency matrix with version compatibility
- 🍬 Tier 1: Eye Candy Stack (Glass, Caustics, Lightformers, Sparkles)
- 🎆 Tier 2: Generative Textures (ComfyUI workflows, Luma AI)
- 🎬 Tier 3: Post-Processing Recipes (Matrix look, Dream look)
- 📦 Tier 4: Asset Vaults (Poly Haven, CC0 resources)
- 🚀 Complete working code example (copy-paste ready)
- ⚡ Performance optimization checklist
- 🐛 Known issues & fixes
- 🔗 Quick reference links

**Use this when:** You need to understand the full stack, implement components, or understand why something doesn't work.

---

### 2. **advanced-shaders.md** 🎨
**Shader Recipes & Custom Materials (4,000 words)**

What's included:
- Custom materials using `three-custom-shader-material` (CSM)
- Recipe 1: Iridescent Glass (replaces Lamina)
- Recipe 2: Animated Displacement (liquid surface)
- Recipe 3: Glitch Shader (Matrix style)
- Recipe 4: Holographic Projection
- Performance comparison: CSM vs Lamina (archived)
- Debugging shader code
- Advanced: Combining CSM with MeshTransmissionMaterial

**Use this when:** You need custom visual effects beyond Drei's built-in materials.

---

### 3. **package-json-reference.md** 📦
**NPM Dependencies & Setup (3,500 words)**

What's included:
- Minimal setup (core 3D stack)
- Full production setup (all features)
- Detailed dependency explanations
- Version compatibility matrix
- Build configuration (Vite)
- Installation instructions
- Common installation issues & fixes
- Bundle size optimization tips
- Runtime optimization
- TypeScript configuration
- Installation verification

**Use this when:** Setting up the project, installing dependencies, or upgrading packages.

---

### 4. **troubleshooting-faq.md** 🔧
**Common Issues & Solutions (3,000 words)**

What's included:
- 🔴 Critical issues (black material, WebGPU breaks, Lamina missing, bloom flicker)
- 🟡 Performance issues (FPS drops, video loading, HDRI quality)
- 🟢 Minor issues (sparkles, caustics, video texture)
- 🔧 Debugging tools & techniques
- 📋 Pre-launch checklist
- 📞 When to ask for help

**Use this when:** Something breaks, performance sucks, or a component doesn't work as expected.

---

## 🎯 Quick Start Path

### Path 1: Just Show Me Code (5 min read)
1. Read: **viron-button-guide.md** → "COMPLETE VIRON BUTTON SCENE (All Tiers)" section
2. Copy-paste the full component
3. Run it (adjust paths as needed)

### Path 2: Understand Everything (30 min read)
1. Read: **viron-button-guide.md** (sections 1-2: Dependencies & Architecture)
2. Read: **package-json-reference.md** (sections 1-3: Minimal → Full Setup)
3. Read: **viron-button-guide.md** (sections 3-4: Assets & Performance)

### Path 3: Deep Technical Implementation (60+ min)
1. Read entire **viron-button-guide.md**
2. Study **advanced-shaders.md** for custom effects
3. Implement custom ComfyUI texture generation workflow
4. Reference **troubleshooting-faq.md** as you go
5. Use **package-json-reference.md** to optimize bundle

### Path 4: Debugging Mode (15 min)
- Jump straight to **troubleshooting-faq.md**
- Find your error in the critical/performance/minor sections
- Follow the solution
- Reference **viron-button-guide.md** for context if needed

---

## 🔑 Key Decisions Made (Jan 2026)

### ✅ Use WebGL2 (Not WebGPU)
- **Why:** Ecosystem complete, stable, fast
- **When to switch:** Q3 2026 when pmndrs finishes TSL migration

### ✅ Use drei's MeshTransmissionMaterial
- **Why:** Best glass effect, actively maintained, optimized
- **Alternative:** Can't use Lamina (archived); would need CSM
- **Cost:** Extra render pass, acceptable on modern GPUs

### ✅ Use CSM Instead of Lamina
- **Why:** Lamina archived June 2025; CSM is actively maintained successor
- **Learning curve:** Slightly higher (raw GLSL), but more control
- **Benefit:** No more "magic" layer composition; explicit shader code

### ✅ Use Luma Dream Machine for Video
- **Why:** Best AI video quality for cinematic use cases
- **Cost:** Pay-as-you-go (reasonable for production)
- **Alternative:** Runway ML (similar quality, different pricing)

### ✅ Use Poly Haven for Assets
- **Why:** CC0 license (no attribution needed), high quality, curated collections
- **Cost:** Free
- **Alternatives:** AmbientCG (also free), Sketchfab (mixed quality)

---

## 📊 Technology Stack Summary

```
Frontend Framework: React 19
3D Renderer: Three.js r171 (WebGL2)
React Integration: @react-three/fiber v9.5.0
Component Library: @react-three/drei v10.7.7
Post-Processing: @react-three/postprocessing v2.16.0
Custom Shaders: three-custom-shader-material v6.0.0
Build Tool: Vite 5.0
Language: TypeScript 5.3
AI Video: Luma Dream Machine API
Texture Generation: ComfyUI + Flux Metal Jacket v2
Asset Source: Poly Haven (CC0)
```

---

## 📈 Performance Targets

### Desktop (M2 MacBook / High-End PC)
- ✅ 60 FPS locked
- ✅ MeshTransmissionMaterial: 16 samples, 1024px resolution
- ✅ All post-processing effects enabled
- ✅ Caustics at full quality

### Mobile (iPad Air / iPhone 14)
- ✅ 30-45 FPS acceptable
- ⚠️ MeshTransmissionMaterial: 8 samples, 512px resolution
- ⚠️ Selective post-processing (Bloom only)
- ⚠️ Caustics at reduced samples

### Bundle Size
- ✅ Target: < 600KB minified (total)
- ✅ Target: < 150KB gzipped (total)
- Breakdown:
  - Three.js: ~150KB
  - R3F ecosystem: ~250KB
  - App code: ~50KB
  - Assets (HDRI): Lazy-loaded

---

## 🚀 Implementation Checklist

### Phase 1: Setup (30 min)
- [ ] Bootstrap Vite + React 19 + TypeScript
- [ ] Install dependencies from package-json-reference.md
- [ ] Set up folder structure
- [ ] Verify installation with simple Canvas test

### Phase 2: Assets Preparation (1-2 hours)
- [ ] Download HDRI from Poly Haven (studio collection)
- [ ] Generate video loop via Luma Dream Machine
- [ ] Export video as WebM (optimized)
- [ ] Set up ComfyUI locally (optional, for texture generation)
- [ ] Place assets in `public/` folder

### Phase 3: Core Implementation (1-2 hours)
- [ ] Create VironButton component (copy from guide)
- [ ] Connect video texture to backdrop
- [ ] Implement MeshTransmissionMaterial
- [ ] Test basic rendering (should see glass with refraction)

### Phase 4: Effects & Polish (1-2 hours)
- [ ] Add Caustics lighting
- [ ] Add Lightformers for neon accents
- [ ] Add Sparkles with Float
- [ ] Test post-processing recipes (Bloom + Glitch)

### Phase 5: Optimization & Testing (1 hour)
- [ ] Profile FPS with Stats component
- [ ] Adjust samples/resolution for performance
- [ ] Test on mobile devices
- [ ] Run pre-launch checklist from troubleshooting-faq.md

### Phase 6: Deployment (30 min)
- [ ] Build with `npm run build`
- [ ] Test build output
- [ ] Deploy to Vercel / Netlify
- [ ] Monitor performance in production

---

## 🆘 Getting Help

### Check Documentation First
1. **For general questions:** viron-button-guide.md
2. **For custom effects:** advanced-shaders.md
3. **For setup issues:** package-json-reference.md
4. **For bugs:** troubleshooting-faq.md

### Escalation Path
1. Search issue in **troubleshooting-faq.md**
2. Check GitHub issues (links in viron-button-guide.md)
3. Ask on Discord: [Poimandres Discord](https://discord.gg/poimandres)
4. Post on Stack Overflow with `#three.js` tag

---

## 📝 File Sizes (Uncompressed)

| File | Size | Read Time |
|------|------|-----------|
| viron-button-guide.md | ~50KB | 20-30 min |
| advanced-shaders.md | ~15KB | 8-10 min |
| package-json-reference.md | ~13KB | 10-12 min |
| troubleshooting-faq.md | ~12KB | 12-15 min |
| **Total** | **~90KB** | **50-67 min** |

---

## 🎓 Learning Resources (External)

### Three.js
- Official Docs: [threejs.org](https://threejs.org)
- Best Tutorial: [threejs-journey.com](https://threejs-journey.com) (paid but worth it)
- Discourse: [discourse.threejs.org](https://discourse.threejs.org)

### React Three Fiber
- Docs: [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- Discord: [Poimandres](https://discord.gg/poimandres)
- YouTube: "React Three Fiber" tutorials (many available)

### Drei
- Docs: [pmndrs.github.io/drei](https://pmndrs.github.io/drei)
- GitHub: [pmndrs/drei](https://github.com/pmndrs/drei)
- Examples: [drei-examples.vercel.app](https://drei-examples.vercel.app)

### GLSL & Shaders
- Book of Shaders: [thebookofshaders.com](https://thebookofshaders.com)
- Learn GLSL: [learnopengl.com](https://learnopengl.com)

### Asset Generation
- Luma AI: [lumalabs.ai/genie](https://lumalabs.ai/genie)
- ComfyUI: [github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- Poly Haven: [polyhaven.com](https://polyhaven.com)

---

## 📞 Contact & Version Info

**Documentation Created For:**
- Viron Agency
- Project: Viron Button (Programmatic Video Engine)
- Target: High-end cinematic UI component

**Verified Against (Jan 27, 2026):**
- Three.js r171
- React 19.0.0
- @react-three/fiber v9.5.0
- @react-three/drei v10.7.7
- @react-three/postprocessing v2.16.0
- three-custom-shader-material v6.0.0

**License:**
Creative Commons CC0 (Public Domain) — Use freely, modify as needed, no attribution required.

**Feedback:**
If you find errors, have suggestions, or want to update this guide:
- Open an issue on GitHub (pmndrs/drei or pmndrs/react-three-fiber)
- Post on Discord: Poimandres community
- Email: Use official pmndrs contact channels

---

## 📋 Quick Reference Map

| Question | Answer File | Section |
|----------|-------------|---------|
| "How do I set this up?" | package-json-reference.md | Installation Instructions |
| "How do I make glass look good?" | viron-button-guide.md | Tier 1: Eye Candy Stack |
| "How do I make custom shaders?" | advanced-shaders.md | Recipe 1-4 |
| "My material is black!" | troubleshooting-faq.md | Issue #1 |
| "FPS is too low" | troubleshooting-faq.md | Issue #5 |
| "WebGPU breaks everything" | troubleshooting-faq.md | Issue #2 |
| "Where do I get assets?" | viron-button-guide.md | Tier 4: Asset Vaults |
| "How do I generate video?" | viron-button-guide.md | Tier 2: Generative Textures |
| "Performance checklist" | troubleshooting-faq.md | Pre-Launch Checklist |
| "Complete code example" | viron-button-guide.md | Complete Scene Section |

---

**You now have everything needed to build a production-quality cinematic UI button.**

Start with the Quick Start Path for your experience level.

Good luck! 🚀

---

**Viron Button Documentation Kit**  
Generated: January 27, 2026  
Status: Complete & Verified  
