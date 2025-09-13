import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      instructor: 'Dr. Priya Kumar',
      progress: 75,
      totalHours: 40,
      completedHours: 30,
      rating: 4.8,
      students: 45,
      description: 'Master fundamental data structures and algorithms essential for computer science.',
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Searching']
    },
    {
      id: 2,
      title: 'Web Technologies',
      instructor: 'Prof. Rajesh Sharma',
      progress: 60,
      totalHours: 35,
      completedHours: 21,
      rating: 4.6,
      students: 42,
      description: 'Learn modern web development technologies including HTML, CSS, JavaScript, and React.',
      topics: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'MongoDB']
    },
    {
      id: 3,
      title: 'Database Management Systems',
      instructor: 'Dr. Anitha Reddy',
      progress: 85,
      totalHours: 30,
      completedHours: 25.5,
      rating: 4.9,
      students: 38,
      description: 'Comprehensive study of database design, implementation, and management.',
      topics: ['SQL', 'Normalization', 'Indexing', 'Transactions', 'NoSQL', 'Query Optimization']
    },
    {
      id: 4,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Venkat Krishna',
      progress: 40,
      totalHours: 45,
      completedHours: 18,
      rating: 4.7,
      students: 35,
      description: 'Introduction to machine learning algorithms and their practical applications.',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'Python', 'TensorFlow']
    }
  ];

  const availableCourses = [
    {
      id: 5,
      title: 'Cloud Computing with AWS',
      instructor: 'Prof. Suresh Kumar',
      totalHours: 50,
      rating: 4.5,
      students: 28,
      description: 'Learn cloud computing concepts and AWS services for modern applications.',
      topics: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation', 'DevOps']
    },
    {
      id: 6,
      title: 'Mobile App Development',
      instructor: 'Dr. Lakshmi Devi',
      totalHours: 40,
      rating: 4.4,
      students: 32,
      description: 'Build mobile applications using React Native and Flutter frameworks.',
      topics: ['React Native', 'Flutter', 'Mobile UI/UX', 'API Integration', 'App Store Deployment']
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress and explore new courses</p>
        </div>
        <Button>Browse All Courses</Button>
      </div>

      {/* Enrolled Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{course.instructor}</span>
                      <Badge variant="secondary" className="ml-2">
                        {course.progress}% Complete
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.completedHours}/{course.totalHours} hours</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.totalHours} hours
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                  {course.topics.slice(0, 4).map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {course.topics.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.topics.length - 4} more
                    </Badge>
                  )}
                </div>

                <Button className="w-full" variant="default">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Available Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                {/* Stats */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.totalHours} hours
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                  {course.topics.slice(0, 4).map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {course.topics.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.topics.length - 4} more
                    </Badge>
                  )}
                </div>

                <Button className="w-full" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;