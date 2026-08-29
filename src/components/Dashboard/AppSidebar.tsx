import {
  CalendarCheck,
  Heart,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Receipt,
  Settings,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { getImageUrl } from "@/redux/getBaseUrl";
import { clearAuth } from "@/redux/slices/authSlice";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import AllImages from "../../assets/AllImages";
import { useI18n } from "../../lib/i18n";
import { SidebarAvater } from "./SidebarAvater";

type NavItem = { key: string; to: string; icon: LucideIcon };

const items: NavItem[] = [
  { key: "overview", to: "/dashboard/family/overview", icon: LayoutGrid },
  { key: "bookings", to: "/dashboard/family/bookings", icon: CalendarCheck },
  { key: "message", to: "/dashboard/family/message", icon: MessageSquare },
  { key: "favorites", to: "/dashboard/family/favorites", icon: Heart },
  { key: "transactions", to: "/dashboard/family/transactions", icon: Receipt },
  { key: "reviews", to: "/dashboard/family/reviews", icon: Star },
  { key: "helpSupport", to: "/dashboard/family/help", icon: LifeBuoy },
  { key: "profileSettings", to: "/dashboard/family/settings", icon: Settings },
];

export function AppSidebar() {
  const { t } = useI18n();
  const location = useLocation();
  const pathname = location.pathname;
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fullName =
      userInfo?.fullName ||
      `${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`.trim() ||
      "User";

    const avatarSrc =
      userInfo?.profileImage && userInfo.profileImage.trim() !== ""
        ? getImageUrl(userInfo.profileImage)
        : undefined;

    const handleLogout = () => {
      dispatch(clearAuth());
      navigate("/");
    };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="h-16">
          <img src={AllImages.logo} alt="" className="h-12.5" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={t(`navbar.${item.key}`)}
                  className="h-10 !bg-transparent hover:!bg-[var(--sidebar-accent)] hover:!text-[var(--sidebar-accent-foreground)] data-[active=true]:!bg-[var(--sidebar-accent)] data-[active=true]:!text-[var(--sidebar-accent-foreground)]"
                >
                  <Link to={item.to}>
                    <Icon className="h-4 w-4" />
                    <span>{t(`navbar.${item.key}`)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-xl bg-card p-2">
          <SidebarAvater name={fullName} src={avatarSrc} size={36} />
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {fullName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {userInfo?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
