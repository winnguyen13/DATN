﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using EnglishApp.Enums;

namespace EnglishApp.Entity
{
    [Table("Courses")]
    public class CourseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public int TeacherId { get; set; }
        [Required]
        public string ClassName { get; set; }
        [ForeignKey("LessonId")]
        public int LessonId { get; set; }
        [Required]
        public PackageCourseType PackageType { get; set; }
        [Required]
        public DateTime StartDated { get; set; }

        public virtual LessonEntity Lesson { get; set; }
    }
}
