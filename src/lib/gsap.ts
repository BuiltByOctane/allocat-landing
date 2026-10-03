import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once, client-side only: vite-react-ssg also evaluates this module at build time.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
