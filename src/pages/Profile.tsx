import DashNav from "@/components/dashnav/dashnav";

export default function Profile() {

    return (
        <>
            <DashNav heading={'Profile'}/>
            <div className="m-5 bg-white rounded-md" style={{ minHeight: "calc(100vh - 80px)" }}>
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
            </div>
        </>
    )
}
