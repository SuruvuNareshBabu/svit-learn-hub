// Welcome to the SVIT LMS Portal - Sri Venkateswara Institute of Technology
// This is a comprehensive Learning Management System built with React and modern web technologies
// 
// Key Features:
// - Role-based authentication (Student/Faculty/Admin)
// - Complete student profile management with all academic and personal details
// - Professional dashboard with statistics and recent activity
// - Responsive design with SVIT branding
// - Mock data for demonstration - easily replaceable with real API integration
//
// Demo Accounts:
// Student: student@svit.edu / password123
// Faculty: faculty@svit.edu / password123  
// Admin: admin@svit.edu / password123

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center text-white p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">SVIT LMS Portal</h1>
          <p className="text-xl text-white/90 mb-6">Sri Venkateswara Institute of Technology</p>
          <p className="text-lg text-white/80">Learning Management System</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-white/90 mb-4">
            Access your personalized learning portal with comprehensive student management features.
          </p>
          <p className="text-sm text-white/70">
            This demo includes role-based dashboards, complete profile management, and all SVIT LMS features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
