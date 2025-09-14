import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Download, Eye, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import jsPDF from "jspdf";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dummy realistic SVIT certificates
  const certificates = [
    {
      id: 1,
      title: "Completion of java Programming",
      studentName: "Suruvu Naresh babu",
      issuer: "Sri Venkateswara Institute of Technology",
      category: "academic",
      issueDate: "2025-06-10",
      credentialId: "SVIT-CP-001",
      description: "Successfully completed 12-week Python programming course with practical projects.",
      skills: ["Python", "Data Structures", "OOP"],
      verified: true,
      certificateUrl: "/certificates/python-svit.pdf",
      logo: "/assets/svit-logo.png",
      signature: "/assets/principal-sign.png",
    },
    {
      id: 2,
      title: "Machine Learning Certification",
      studentName: "Suruvu Naresh babu",
      issuer: "Sri Venkateswara Institute of Technology",
      category: "academic",
      issueDate: "2025-07-15",
      credentialId: "SVIT-ML-002",
      description: "Completed Machine Learning fundamentals and model deployment with projects.",
      skills: ["ML", "Python", "TensorFlow"],
      verified: true,
      certificateUrl: "/certificates/ml-svit.pdf",
      logo: "/assets/svit-logo.png",
      signature: "/assets/principal-sign.png",
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      studentName: " Suruvu Naresh babu",
      issuer: "Sri Venkateswara Institute of Technology",
      category: "professional",
      issueDate: "2025-08-05",
      credentialId: "SVIT-FSWD-003",
      description: "Professional Certificate in Full Stack Web Development using React, Node.js, MongoDB.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      verified: true,
      certificateUrl: "/certificates/fullstack-svit.pdf",
      logo: "/assets/svit-logo.png",
      signature: "/assets/principal-sign.png",
    },
     {
      id: 4,
      title: "Completion of Python Programming",
      studentName: " Suruvu Naresh babu",
      issuer: "Sri Venkateswara Institute of Technology",
      category: "academic",
      issueDate: "2025-06-10",
      credentialId: "SVIT-CP-001",
      description: "Successfully completed 12-week Python programming course with practical projects.",
      skills: ["Python", "Data Structures", "OOP"],
      verified: true,
      certificateUrl: "/certificates/python-svit.pdf",
      logo: "/assets/svit-logo.png",
      signature: "/assets/principal-sign.png",
    },





  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "professional":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadCertificatePDF = (cert: any) => {
    const doc = new jsPDF("landscape", "pt", "a4");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Certificate of Completion", 420, 80, { align: "center" });
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 420, 130, { align: "center" });
    doc.setFontSize(22);
    doc.text(cert.studentName, 420, 170, { align: "center" });
    doc.setFontSize(16);
    doc.text(`has successfully completed the course:`, 420, 200, { align: "center" });
    doc.setFontSize(20);
    doc.text(cert.title, 420, 230, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Issued by ${cert.issuer}`, 420, 270, { align: "center" });
    doc.text(`Date: ${format(parseISO(cert.issueDate), "MMM dd, yyyy")}`, 420, 290, { align: "center" });
    doc.text(`Credential ID: ${cert.credentialId}`, 420, 310, { align: "center" });

    // Logo
    if (cert.logo) {
      doc.addImage(cert.logo, "PNG", 50, 50, 100, 100);
    }
    // Signature
    if (cert.signature) {
      doc.addImage(cert.signature, "PNG", 700, 350, 120, 60);
      doc.text("Principal", 750, 420);
    }

    doc.save(`${cert.studentName}-${cert.title}.pdf`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SVIT Certificates</h1>
          <p className="text-muted-foreground">View, manage, and download your official SVIT certifications</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search by student, course or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <Badge className={getCategoryColor(cert.category)}>{cert.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-lg font-semibold">{cert.title}</CardTitle>
              <CardDescription>Student: {cert.studentName}</CardDescription>
              <CardDescription>Issuer: {cert.issuer}</CardDescription>
              <CardDescription>Date: {format(parseISO(cert.issueDate), "MMM dd, yyyy")}</CardDescription>
              <div className="flex gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-3 w-3" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-4xl p-6">
                    <div className="bg-white p-6 border rounded-lg text-center relative">
                      <img src={cert.logo} alt="SVIT Logo" className="absolute top-4 left-4 w-20" />
                      <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                      <p className="text-lg mb-1">This certifies that</p>
                      <h3 className="text-xl font-semibold mb-2">{cert.studentName}</h3>
                      <p className="text-lg mb-2">has successfully completed the course</p>
                      <h4 className="text-lg font-medium mb-2">{cert.title}</h4>
                      <p className="text-sm mb-1">Issued by {cert.issuer}</p>
                      <p className="text-sm mb-1">Date: {format(parseISO(cert.issueDate), "MMM dd, yyyy")}</p>
                      <p className="text-sm mb-2">Credential ID: {cert.credentialId}</p>
                      <img src={cert.signature} alt="Principal Signature" className="mx-auto mt-4 w-32" />
                      <p className="text-xs mt-1">Principal</p>
                      <Button variant="outline" className="mt-4" onClick={() => downloadCertificatePDF(cert)}>
                        <Download className="mr-2 h-3 w-3" />
                        Download PDF
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" className="flex-1" onClick={() => downloadCertificatePDF(cert)}>
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
