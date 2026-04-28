import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logoLargeDark from "../../assets/logo-large-dark.svg";
import logoLargeLight from "../../assets/logo-large-light.svg";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

const HERO_STARS = [
  { x: 5, y: 8, size: 2, opacity: 0.95, blur: 0 },
  { x: 7, y: 14, size: 1.2, opacity: 0.6, blur: 0 },
  { x: 9, y: 22, size: 1.1, opacity: 0.52, blur: 0 },
  { x: 12, y: 6, size: 2.8, opacity: 0.38, blur: 0.7 },
  { x: 14, y: 18, size: 1.4, opacity: 0.78, blur: 0 },
  { x: 17, y: 11, size: 1.1, opacity: 0.58, blur: 0 },
  { x: 19, y: 28, size: 1.8, opacity: 0.88, blur: 0 },
  { x: 22, y: 7, size: 1.3, opacity: 0.68, blur: 0 },
  { x: 25, y: 16, size: 1, opacity: 0.55, blur: 0 },
  { x: 28, y: 24, size: 2.4, opacity: 0.28, blur: 0.9 },
  { x: 31, y: 9, size: 1.7, opacity: 0.92, blur: 0 },
  { x: 34, y: 13, size: 1, opacity: 0.48, blur: 0 },
  { x: 36, y: 5, size: 1.2, opacity: 0.74, blur: 0 },
  { x: 39, y: 21, size: 1.4, opacity: 0.65, blur: 0 },
  { x: 42, y: 10, size: 3.2, opacity: 0.34, blur: 1 },
  { x: 45, y: 17, size: 1.2, opacity: 0.85, blur: 0 },
  { x: 48, y: 6, size: 1, opacity: 0.55, blur: 0 },
  { x: 51, y: 14, size: 1.6, opacity: 0.7, blur: 0 },
  { x: 54, y: 23, size: 1.1, opacity: 0.5, blur: 0 },
  { x: 57, y: 12, size: 2, opacity: 0.9, blur: 0 },
  { x: 60, y: 8, size: 1.2, opacity: 0.58, blur: 0 },
  { x: 63, y: 19, size: 1, opacity: 0.42, blur: 0 },
  { x: 66, y: 5, size: 1.3, opacity: 0.8, blur: 0 },
  { x: 69, y: 16, size: 1.1, opacity: 0.55, blur: 0 },
  { x: 72, y: 11, size: 2.5, opacity: 0.3, blur: 0.9 },
  { x: 75, y: 20, size: 1.4, opacity: 0.76, blur: 0 },
  { x: 78, y: 7, size: 1, opacity: 0.5, blur: 0 },
  { x: 81, y: 15, size: 1.9, opacity: 0.9, blur: 0 },
  { x: 84, y: 24, size: 1.2, opacity: 0.64, blur: 0 },
  { x: 87, y: 10, size: 1, opacity: 0.46, blur: 0 },
  { x: 90, y: 18, size: 2.7, opacity: 0.36, blur: 0.8 },
  { x: 93, y: 6, size: 1.5, opacity: 0.82, blur: 0 },
  { x: 96, y: 14, size: 1.1, opacity: 0.56, blur: 0 },
  { x: 98, y: 21, size: 1.3, opacity: 0.7, blur: 0 },
  { x: 4, y: 30, size: 1.1, opacity: 0.42, blur: 0 },
  { x: 10, y: 32, size: 1, opacity: 0.34, blur: 0 },
  { x: 16, y: 34, size: 1.3, opacity: 0.48, blur: 0 },
  { x: 23, y: 31, size: 1.1, opacity: 0.4, blur: 0 },
  { x: 30, y: 33, size: 1, opacity: 0.35, blur: 0 },
  { x: 37, y: 30, size: 1.4, opacity: 0.44, blur: 0 },
  { x: 44, y: 34, size: 1.1, opacity: 0.32, blur: 0 },
  { x: 52, y: 31, size: 1.2, opacity: 0.4, blur: 0 },
  { x: 59, y: 33, size: 1, opacity: 0.3, blur: 0 },
  { x: 67, y: 31, size: 1.3, opacity: 0.46, blur: 0 },
  { x: 74, y: 34, size: 1.1, opacity: 0.36, blur: 0 },
  { x: 82, y: 32, size: 1.2, opacity: 0.42, blur: 0 },
  { x: 89, y: 30, size: 1, opacity: 0.34, blur: 0 },
  { x: 95, y: 33, size: 1.1, opacity: 0.38, blur: 0 },
  { x: 3, y: 4, size: 1, opacity: 0.72, blur: 0 },
  { x: 6, y: 3, size: 0.9, opacity: 0.54, blur: 0 },
  { x: 8, y: 5, size: 1.1, opacity: 0.7, blur: 0 },
  { x: 11, y: 2, size: 1.2, opacity: 0.82, blur: 0 },
  { x: 14, y: 4, size: 0.95, opacity: 0.6, blur: 0 },
  { x: 18, y: 3, size: 1, opacity: 0.78, blur: 0 },
  { x: 21, y: 5, size: 0.85, opacity: 0.5, blur: 0 },
  { x: 24, y: 2, size: 1.1, opacity: 0.74, blur: 0 },
  { x: 27, y: 4, size: 0.9, opacity: 0.56, blur: 0 },
  { x: 30, y: 3, size: 1, opacity: 0.8, blur: 0 },
  { x: 34, y: 4, size: 0.95, opacity: 0.62, blur: 0 },
  { x: 38, y: 2, size: 1.2, opacity: 0.84, blur: 0 },
  { x: 41, y: 4, size: 0.9, opacity: 0.55, blur: 0 },
  { x: 45, y: 3, size: 1, opacity: 0.72, blur: 0 },
  { x: 49, y: 2, size: 1.1, opacity: 0.8, blur: 0 },
  { x: 53, y: 4, size: 0.85, opacity: 0.52, blur: 0 },
  { x: 57, y: 3, size: 1, opacity: 0.7, blur: 0 },
  { x: 61, y: 2, size: 1.15, opacity: 0.82, blur: 0 },
  { x: 64, y: 5, size: 0.9, opacity: 0.58, blur: 0 },
  { x: 68, y: 3, size: 1.05, opacity: 0.76, blur: 0 },
  { x: 72, y: 2, size: 0.95, opacity: 0.6, blur: 0 },
  { x: 75, y: 4, size: 1.1, opacity: 0.78, blur: 0 },
  { x: 79, y: 3, size: 0.9, opacity: 0.54, blur: 0 },
  { x: 83, y: 2, size: 1.15, opacity: 0.8, blur: 0 },
  { x: 87, y: 4, size: 0.95, opacity: 0.62, blur: 0 },
  { x: 91, y: 3, size: 1.05, opacity: 0.74, blur: 0 },
  { x: 95, y: 2, size: 0.9, opacity: 0.56, blur: 0 },
  { x: 98, y: 4, size: 1, opacity: 0.7, blur: 0 },
  { x: 5, y: 1, size: 0.85, opacity: 0.44, blur: 0 },
  { x: 15, y: 1, size: 0.9, opacity: 0.42, blur: 0 },
  { x: 26, y: 1, size: 0.8, opacity: 0.4, blur: 0 },
  { x: 37, y: 1, size: 0.85, opacity: 0.44, blur: 0 },
  { x: 48, y: 1, size: 0.8, opacity: 0.38, blur: 0 },
  { x: 59, y: 1, size: 0.9, opacity: 0.42, blur: 0 },
  { x: 70, y: 1, size: 0.82, opacity: 0.4, blur: 0 },
  { x: 81, y: 1, size: 0.88, opacity: 0.43, blur: 0 },
  { x: 92, y: 1, size: 0.84, opacity: 0.39, blur: 0 },
  { x: 2, y: 7, size: 0.8, opacity: 0.48, blur: 0 },
  { x: 4, y: 9, size: 0.7, opacity: 0.34, blur: 0 },
  { x: 7, y: 7, size: 0.8, opacity: 0.46, blur: 0 },
  { x: 10, y: 9, size: 0.75, opacity: 0.38, blur: 0 },
  { x: 13, y: 7, size: 0.82, opacity: 0.5, blur: 0 },
  { x: 16, y: 9, size: 0.76, opacity: 0.36, blur: 0 },
  { x: 19, y: 7, size: 0.84, opacity: 0.48, blur: 0 },
  { x: 22, y: 9, size: 0.72, opacity: 0.34, blur: 0 },
  { x: 25, y: 7, size: 0.8, opacity: 0.46, blur: 0 },
  { x: 28, y: 9, size: 0.74, opacity: 0.36, blur: 0 },
  { x: 31, y: 7, size: 0.82, opacity: 0.48, blur: 0 },
  { x: 34, y: 9, size: 0.7, opacity: 0.34, blur: 0 },
  { x: 37, y: 7, size: 0.84, opacity: 0.5, blur: 0 },
  { x: 40, y: 9, size: 0.75, opacity: 0.38, blur: 0 },
  { x: 43, y: 7, size: 0.8, opacity: 0.44, blur: 0 },
  { x: 46, y: 9, size: 0.72, opacity: 0.34, blur: 0 },
  { x: 50, y: 7, size: 0.82, opacity: 0.48, blur: 0 },
  { x: 53, y: 9, size: 0.74, opacity: 0.36, blur: 0 },
  { x: 56, y: 7, size: 0.82, opacity: 0.48, blur: 0 },
  { x: 59, y: 9, size: 0.72, opacity: 0.34, blur: 0 },
  { x: 62, y: 7, size: 0.84, opacity: 0.5, blur: 0 },
  { x: 65, y: 9, size: 0.75, opacity: 0.38, blur: 0 },
  { x: 68, y: 7, size: 0.8, opacity: 0.46, blur: 0 },
  { x: 71, y: 9, size: 0.72, opacity: 0.34, blur: 0 },
  { x: 74, y: 7, size: 0.84, opacity: 0.48, blur: 0 },
  { x: 77, y: 9, size: 0.74, opacity: 0.36, blur: 0 },
  { x: 80, y: 7, size: 0.8, opacity: 0.46, blur: 0 },
  { x: 83, y: 9, size: 0.7, opacity: 0.34, blur: 0 },
  { x: 86, y: 7, size: 0.82, opacity: 0.48, blur: 0 },
  { x: 89, y: 9, size: 0.74, opacity: 0.36, blur: 0 },
  { x: 92, y: 7, size: 0.84, opacity: 0.5, blur: 0 },
  { x: 95, y: 9, size: 0.72, opacity: 0.34, blur: 0 },
  { x: 98, y: 7, size: 0.8, opacity: 0.44, blur: 0 },
  { x: 6, y: 12, size: 0.72, opacity: 0.32, blur: 0 },
  { x: 12, y: 13, size: 0.68, opacity: 0.28, blur: 0 },
  { x: 18, y: 12, size: 0.74, opacity: 0.34, blur: 0 },
  { x: 24, y: 13, size: 0.7, opacity: 0.3, blur: 0 },
  { x: 30, y: 12, size: 0.72, opacity: 0.32, blur: 0 },
  { x: 36, y: 13, size: 0.68, opacity: 0.28, blur: 0 },
  { x: 42, y: 12, size: 0.74, opacity: 0.34, blur: 0 },
  { x: 48, y: 13, size: 0.7, opacity: 0.3, blur: 0 },
  { x: 54, y: 12, size: 0.72, opacity: 0.32, blur: 0 },
  { x: 60, y: 13, size: 0.68, opacity: 0.28, blur: 0 },
  { x: 66, y: 12, size: 0.74, opacity: 0.34, blur: 0 },
  { x: 72, y: 13, size: 0.7, opacity: 0.3, blur: 0 },
  { x: 78, y: 12, size: 0.72, opacity: 0.32, blur: 0 },
  { x: 84, y: 13, size: 0.68, opacity: 0.28, blur: 0 },
  { x: 90, y: 12, size: 0.74, opacity: 0.34, blur: 0 },
  { x: 96, y: 13, size: 0.7, opacity: 0.3, blur: 0 },
  { x: 1, y: 6, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 3, y: 11, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 5, y: 15, size: 0.64, opacity: 0.3, blur: 0 },
  { x: 8, y: 12, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 10, y: 16, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 13, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 15, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 18, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 20, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 23, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 26, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 29, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 32, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 35, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 38, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 41, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 44, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 47, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 50, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 53, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 56, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 59, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 62, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 65, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 68, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 71, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 74, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 77, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 80, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 83, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 86, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 89, y: 15, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 92, y: 11, size: 0.6, opacity: 0.26, blur: 0 },
  { x: 95, y: 14, size: 0.58, opacity: 0.24, blur: 0 },
  { x: 98, y: 10, size: 0.62, opacity: 0.28, blur: 0 },
  { x: 4, y: 18, size: 0.6, opacity: 0.24, blur: 0 },
  { x: 9, y: 20, size: 0.58, opacity: 0.22, blur: 0 },
  { x: 14, y: 18, size: 0.62, opacity: 0.26, blur: 0 },
  { x: 19, y: 20, size: 0.56, opacity: 0.2, blur: 0 },
  { x: 24, y: 18, size: 0.6, opacity: 0.24, blur: 0 },
  { x: 29, y: 20, size: 0.58, opacity: 0.22, blur: 0 },
  { x: 34, y: 18, size: 0.62, opacity: 0.26, blur: 0 },
  { x: 39, y: 20, size: 0.56, opacity: 0.2, blur: 0 },
  { x: 44, y: 18, size: 0.6, opacity: 0.24, blur: 0 },
  { x: 49, y: 20, size: 0.58, opacity: 0.22, blur: 0 },
  { x: 54, y: 18, size: 0.62, opacity: 0.26, blur: 0 },
  { x: 59, y: 20, size: 0.56, opacity: 0.2, blur: 0 },
  { x: 64, y: 18, size: 0.6, opacity: 0.24, blur: 0 },
  { x: 69, y: 20, size: 0.58, opacity: 0.22, blur: 0 },
  { x: 74, y: 18, size: 0.62, opacity: 0.26, blur: 0 },
  { x: 79, y: 20, size: 0.56, opacity: 0.2, blur: 0 },
  { x: 84, y: 18, size: 0.6, opacity: 0.24, blur: 0 },
  { x: 89, y: 20, size: 0.58, opacity: 0.22, blur: 0 },
  { x: 94, y: 18, size: 0.62, opacity: 0.26, blur: 0 },
  { x: 2, y: 2, size: 0.55, opacity: 0.24, blur: 0 },
  { x: 4, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 6, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 8, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 10, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 12, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 14, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 16, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 18, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 20, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 22, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 24, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 26, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 28, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 30, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 32, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 34, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 36, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 38, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 40, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 42, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 44, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 46, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 48, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 50, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 52, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 54, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 56, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 58, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 60, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 62, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 64, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 66, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 68, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 70, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 72, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 74, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 76, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 78, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 80, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 82, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 84, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 86, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 88, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 90, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 92, y: 3, size: 0.52, opacity: 0.2, blur: 0 },
  { x: 94, y: 2, size: 0.54, opacity: 0.22, blur: 0 },
  { x: 96, y: 3, size: 0.5, opacity: 0.18, blur: 0 },
  { x: 98, y: 2, size: 0.56, opacity: 0.24, blur: 0 },
  { x: 2, y: 25, size: 0.52, opacity: 0.18, blur: 0 },
  { x: 8, y: 24, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 14, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 20, y: 24, size: 0.54, opacity: 0.2, blur: 0 },
  { x: 26, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 32, y: 24, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 38, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 44, y: 24, size: 0.54, opacity: 0.2, blur: 0 },
  { x: 50, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 56, y: 24, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 62, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 68, y: 24, size: 0.54, opacity: 0.2, blur: 0 },
  { x: 74, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 80, y: 24, size: 0.56, opacity: 0.22, blur: 0 },
  { x: 86, y: 26, size: 0.5, opacity: 0.16, blur: 0 },
  { x: 92, y: 24, size: 0.54, opacity: 0.2, blur: 0 },
];

export function HeroSection() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const heroLogo = theme === "dark" ? logoLargeDark : logoLargeLight;
  const starColor = theme === "dark" ? "255,255,255" : "10,10,10";

  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      const offsetMinutes = -d.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? "+" : "-";
      const absOffset = Math.abs(offsetMinutes);
      const offsetHours = Math.floor(absOffset / 60).toString().padStart(2, "0");
      const offsetRemainder = (absOffset % 60).toString().padStart(2, "0");
      setClock(`${h}:${m}:${s} GMT${sign}${offsetHours}:${offsetRemainder}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "var(--app-bg)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {HERO_STARS.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: theme === "dark" ? star.opacity : star.opacity * 0.32,
              background: `rgba(${starColor}, 1)`,
              filter: star.blur ? `blur(${star.blur}px)` : "none",
              boxShadow:
                star.size >= 2
                  ? `0 0 ${Math.max(4, star.size * 2.5)}px rgba(${starColor}, ${theme === "dark" ? 0.25 : 0.08})`
                  : "none",
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 38%, var(--app-bg) 68%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-24 left-4 sm:left-6 md:left-10 z-10 uppercase hidden sm:block"
        style={{ fontSize: "0.55rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-3)" }}
      >
        {clock}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-24 right-4 sm:right-6 md:right-10 z-10 hidden sm:flex flex-col items-end gap-1 uppercase"
        style={{ fontSize: "0.55rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-3)" }}
      >
        <span>LORA_v04.26</span>
        <span style={{ color: "var(--fg-4)" }}>N 40.7128 / W 74.0060</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center mt-[136px] sm:mt-[152px]"
      >
        <img
          src={heroLogo}
          alt="LORA"
          className="w-[min(84vw,420px)] sm:w-[clamp(280px,58vw,720px)] h-auto pointer-events-none select-none"
          draggable={false}
          style={{ WebkitUserDrag: "none" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-[34rem] mt-3 sm:mt-4 mb-12 sm:mb-16 px-2"
          style={{ fontSize: "1.05rem", lineHeight: 1.72, letterSpacing: "0.01em", color: "var(--fg-3)" }}
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex w-full max-w-[34rem] flex-col sm:flex-row gap-3 sm:gap-4 px-2"
        >
          <button
            onClick={() => {
              const el = document.getElementById("contact-form");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "instant" });
              }
            }}
            className="group relative flex w-full sm:w-auto justify-center px-8 sm:px-14 py-4.5 uppercase tracking-[0.22em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontSize: "0.68rem", fontWeight: 700, background: "var(--cta-bg)", color: "var(--cta-fg)", boxShadow: `0 0 60px ${"var(--button-shadow)"}` }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              {t("hero.cta.primary")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-y-1">
                <path d="M6 1V11M6 11L2 7M6 11L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("contact-form");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "instant" });
              }
            }}
            className="group relative flex w-full sm:w-auto justify-center px-8 sm:px-14 py-4.5 uppercase tracking-[0.22em] cursor-pointer overflow-hidden transition-all duration-500 rounded-xl"
            style={{ fontSize: "0.68rem", fontWeight: 500, border: "1px solid var(--surface-border)", color: "var(--fg-2)", background: "transparent" }}
          >
            <span className="relative z-10">{t("hero.cta.secondary")}</span>
          </button>
        </motion.div>
      </motion.div>


    </section>
  );
}