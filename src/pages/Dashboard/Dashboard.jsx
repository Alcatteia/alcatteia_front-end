import LeaderDashboard from "./LeaderDashboard";

function Dashboard() {
  return (
    // Container principal da aplicação.
    <div className="flex flex-col h-screen bg-[#160F23]">
      <div className="flex flex-1">
        <LeaderDashboard />
      </div>
    </div>
  );
}


export default Dashboard;