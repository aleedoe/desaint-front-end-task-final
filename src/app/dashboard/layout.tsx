"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

// Tipe untuk data breadcrumb
type BreadcrumbMap = Record<string, { label: string; path?: string }[]>;

// Data untuk breadcrumb
const breadcrumbData: BreadcrumbMap = {
    "/dashboard": [{ label: "Home", path: "/dashboard" }],
    "/dashboard/residentVerify": [
        { label: "Home", path: "/dashboard" },
        { label: "Penduduk", path: "/dashboard/residentVerify" },
    ],
    "/dashboard/migrateVerify": [
        { label: "Home", path: "/dashboard" },
        { label: "Perpindahan", path: "/dashboard/migrateVerify" },
    ],
    "/dashboard/resident": [
        { label: "Home", path: "/dashboard" },
        { label: "Penduduk", path: "/dashboard/resident" },
    ],
    "/dashboard/migrate": [
        { label: "Home", path: "/dashboard" },
        { label: "Perpindahan", path: "/dashboard/migrate" },
    ],
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const breadcrumbItems = breadcrumbData[pathname] || [
        { label: "Home", path: "/" },
    ];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbItems.map((item, index) => (
                                <BreadcrumbItem key={item.label}>
                                    {index < breadcrumbItems.length - 1 ? (
                                        <>
                                            <BreadcrumbLink
                                                href={item.path || "#"}
                                            >
                                                {item.label}
                                            </BreadcrumbLink>
                                            <BreadcrumbSeparator />
                                        </>
                                    ) : (
                                        <BreadcrumbPage>
                                            {item.label}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
