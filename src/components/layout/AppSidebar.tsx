import { NavLink, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Sparkles,
  Tag,
  Image as ImageIcon,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";

const items = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Services", url: "/services", icon: Sparkles },
  { title: "Pricing", url: "/pricing", icon: Tag },
  { title: "Gallery", url: "/gallery", icon: ImageIcon },
  { title: "About & Trust", url: "/about", icon: ShieldCheck },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="px-3 py-4">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0">
            <div className="absolute inset-0 rounded-lg bg-gradient-gold shadow-gold" />
            <div className="absolute inset-[1px] rounded-[7px] bg-background flex items-center justify-center">
              <span className="font-serif text-sm gold-text">NT</span>
            </div>
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-serif text-sm">Niagara Turnover Co.</div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Property Readiness
              </div>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Menu</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-3 gap-2">
          <a
            href={PHONE_TEL}
            className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold focus-gold"
          >
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
          <a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-semibold text-primary-foreground shadow-gold border border-primary/30"
          >
            Schedule <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
