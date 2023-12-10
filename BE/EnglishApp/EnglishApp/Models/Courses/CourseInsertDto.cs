using EnglishApp.Enums;
using System;
using System.Collections.Generic;

namespace EnglishApp.Models.Courses
{
    public class CourseInsertDto
    {
        public string Name { get; set; }
        public string ClassName { get; set; }
        public string Description { get; set; }
        public int TeacherId { get; set; }
        public int LessonId { get; set; }
        public PackageCourseType PackageType { get; set; }
        public DateTime StartDated { get; set; }
    }
}
