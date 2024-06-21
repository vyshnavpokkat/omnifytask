import { ContentPanel } from "@/components/ContentPanel";
import { MobileNavbar } from "@/components/MobileNavbar";
import { Sidebar } from "@/components/Sidebar";

export default function Page() {
    return (
        <>
            <MobileNavbar />
            <Sidebar />
            <ContentPanel />
        </>
    )
}