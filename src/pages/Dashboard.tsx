import DashNav from "@/components/dashnav/dashnav";

export default function Dashboard() {

    return (
        <>
            <DashNav heading={'Welcome to BoWizzy'}/>
            <div className="m-5 bg-white rounded-md" style={{ minHeight: "calc(100vh - 80px)" }}>
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            </div>
        </>
    )
}
