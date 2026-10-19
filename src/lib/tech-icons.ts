import type { IconType } from "react-icons";
import {
  SiAngular, SiCloudflare, SiDjango, SiDocker, SiDotnet, SiElasticsearch, SiFastapi, SiFirebase,
  SiFlutter, SiGithubactions, SiGo, SiGooglecloud, SiGraphql, SiKubernetes, SiMongodb, SiMysql,
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiRedis, SiSupabase, SiTailwindcss,
  SiTerraform, SiTypescript, SiVuedotjs, SiLaravel,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { TbDatabase } from "react-icons/tb";

/** Official brand marks (Simple Icons, with Font Awesome / VS Code fallbacks) and brand colours. */
export const TECH_ICONS: Record<string, { icon: IconType; color: string }> = {
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#000000" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  angular: { icon: SiAngular, color: "#DD0031" },
  ts: { icon: SiTypescript, color: "#3178C6" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  flutter: { icon: SiFlutter, color: "#02569B" },
  reactnative: { icon: SiReact, color: "#61DAFB" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  python: { icon: SiPython, color: "#3776AB" },
  go: { icon: SiGo, color: "#00ADD8" },
  java: { icon: FaJava, color: "#E76F00" },
  dotnet: { icon: SiDotnet, color: "#512BD4" },
  django: { icon: SiDjango, color: "#092E20" },
  laravel: { icon: SiLaravel, color: "#FF2D20" },
  fastapi: { icon: SiFastapi, color: "#009688" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  redis: { icon: SiRedis, color: "#FF4438" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  dynamodb: { icon: TbDatabase, color: "#4053D6" },
  elastic: { icon: SiElasticsearch, color: "#005571" },
  supabase: { icon: SiSupabase, color: "#3FCF8E" },
  firebase: { icon: SiFirebase, color: "#DD2C00" },
  aws: { icon: FaAws, color: "#FF9900" },
  gcp: { icon: SiGooglecloud, color: "#4285F4" },
  azure: { icon: VscAzure, color: "#0078D4" },
  docker: { icon: SiDocker, color: "#2496ED" },
  k8s: { icon: SiKubernetes, color: "#326CE5" },
  terraform: { icon: SiTerraform, color: "#844FBA" },
  github: { icon: SiGithubactions, color: "#2088FF" },
  cloudflare: { icon: SiCloudflare, color: "#F38020" },
};
