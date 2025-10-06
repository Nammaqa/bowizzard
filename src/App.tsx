import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./components/ui/sidebar";
import Bowizzy from "@/assets/bowizzy.png";
import {
  Box,
  Crown,
  FileArchive,
  LayoutDashboard,
  Linkedin,
  LogOut,
  MessageSquare,
  Phone,
  User,
  Video,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LinkedInOptimization from "./pages/LinkedInOptimization";
const isAuthenticated = () => {
  return true;
};
// const items = [
//   {
//     title: "Home",
//     url: "/",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

const careerMap = [
  {
    href: "/profile",
    icon: <User color="#3B3B3B" size={16} />,
    label: "Profile",
  },
  {
    href: "/profile",
    icon: <FileArchive color="#3B3B3B" size={16} />,
    label: "My resumes",
  },
  {
    href: "/profile",
    icon: <Video color="#3B3B3B" size={16} />,
    label: "Interview Prep",
  },
  {
    href: "/profile",
    icon: <Phone color="#3B3B3B" size={16} />,
    label: "Career guidance",
  },
  {
    href: "/profile",
    icon: <Linkedin color="#3B3B3B" size={16} />,
    label: "LinkedIn optimization",
  },
];
const bowizzy = [
  {
    href: "/digital-product",
    icon: <Box color="#3B3B3B" size={16} />,
    label: "Digital product",
  },
  {
    href: "/premium",
    icon: <Crown color="#3B3B3B" size={16} />,
    label: "Go premium",
  },
  {
    href: "/feeedback",
    icon: <MessageSquare color="#3B3B3B" size={16} />,
    label: "Feedback",
  },
];
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar className="overflow-y-auto">
        <SidebarHeader>
          <div className="flex items-center justify-center p-6">
            <img src={Bowizzy} alt="Bowizzard Logo" />
          </div>
          {/* <div className="h-10">

          </div> */}
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"Dashboard"}>
                <SidebarMenuButton asChild className="p-5 flex items-center">
                  <a href={"/dashboard"}>
                    {/* <item.icon /> */}
                    <LayoutDashboard color="#3B3B3B" size={16} />
                    <span className="ml-4" style={{ fontSize: "14px" }}>
                      Dashboard
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="p-5">Career</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {careerMap.map((item, idx) => (
                <SidebarMenuButton
                  asChild
                  className="p-5 flex items-center"
                  key={item.label + idx}
                >
                  <a href={item.href}>
                    {item.icon}
                    <span className="ml-4" style={{ fontSize: "14px" }}>
                      {item.label}
                    </span>
                  </a>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="p-5">Bowizzy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bowizzy.map((item, idx) => (
                <SidebarMenuButton
                  asChild
                  className="p-5 flex items-center"
                  key={item.label + idx}
                >
                  <a href={item.href}>
                    {item.icon}
                    <span className="ml-4" style={{ fontSize: "14px" }}>
                      {item.label}
                    </span>
                  </a>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto mb-4">
          <SidebarMenuButton
            asChild
            className="p-5 flex items-center border-2 border-[#FF0000]"
          >
            <a href={"logout"}>
              <LogOut color="#FF0000" size={16} />
              <span
                className="ml-4"
                style={{ fontSize: "14px", color: "#FF0000" }}
              >
                Logout
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <main className="bg-[#F0F0F0] min-h-screen flex-1">{children}</main>
    </SidebarProvider>
  );
}
// ProtectedRoute component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    // Redirect to home or login page
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: () => <Home />,
    },
    {
      path: "dashboard",
      Component: () => (
        <ProtectedRoute>
          <LayoutWrapper>
            <Dashboard />
          </LayoutWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: "profile",
      Component: () => (
        <ProtectedRoute>
          <LayoutWrapper>
            <Profile />
          </LayoutWrapper>
        </ProtectedRoute>
      ),
      
    },
    {
      path: "linkedin-optimization",
      Component: () => (
        <ProtectedRoute>
          <LayoutWrapper>
            <LinkedInOptimization />
          </LayoutWrapper>
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
