using EnglishApp.Entity;
using EnglishApp.Models;
using EnglishApp.Models.Courses;
using EnglishApp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.Services.Course
{
    public class CourseService : GenericRepository<CourseEntity, EnglishContext>, ICourseService
    {
        public async Task<bool> CreateCourse(CourseInsertDto input)
        {
            var entity = new CourseEntity()
            {
                ClassName = input.ClassName,
                CreatedAt = DateTime.Now,
                Description = input.Description,
                Name = input.Name,
                TeacherId = input.TeacherId,
                LessonId = input.LessonId,
                PackageType = input.PackageType,
                StartDated = input.StartDated
            };
            englishContext.Courses.Add(entity);
            return await englishContext.SaveChangesAsync() > -1;
        }

        public async Task<CourseDto> GetCourseById(int id)
        {
            var iQueryable = englishContext.Courses.Join(englishContext.Teachers, c => c.TeacherId, t => t.Id, (c, t) => new { c, t });
            iQueryable = iQueryable.Where(m => m.c.Id == id);
            var data = await iQueryable.Select(m => new CourseDto
            {
                ClassName = m.c.ClassName,
                Id = m.c.Id,
                Name = m.c.Name,
                TeacherName = m.t.Name
            }).FirstOrDefaultAsync();

            return data;
        }

        public async Task<List<CourseDto>> GetListCourse(string search = "")
        {
            var iQueryable =  englishContext.Courses.Join(englishContext.Teachers, c => c.TeacherId, t => t.Id, (c, t) => new { c, t })
                .Join(englishContext.Lessons, c2 => c2.c.LessonId, l => l.Id, (c2, l) => new { c = c2.c, t = c2.t, l });
            if(!string.IsNullOrWhiteSpace(search))
            {
                iQueryable = iQueryable.Where(m => EF.Functions.Like(m.c.Name.ToLower(), $"%{search.ToLower()}%") || EF.Functions.Like(m.c.ClassName.ToLower(), $"%{search.ToLower()}%"));
            }
            var data = await iQueryable.Select(m => new CourseDto
            {
                ClassName = m.c.ClassName,
                Id = m.c.Id,
                Name = m.c.Name,
                TeacherName = m.t.Name,
                LessonName = m.l.Name
            }).ToListAsync();

            return data;
        }

        public async Task<List<LessonDto>> GetLessons()
        {
            var iQueryable = englishContext.Lessons;
            var results = await iQueryable.Select(m => new LessonDto
            {
                Id = m.Id,
                Name = m.Name
            }).ToListAsync();
            return results;
        }

        public async Task<List<CalendarDto>> GetCalendars(CalendarRequest request)
        {
            var iQueryable = englishContext.Courses.AsQueryable();
            int days = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            
            if (request.ChooseDate.HasValue)
            {
                days = DateTime.DaysInMonth(request.ChooseDate.Value.Year, request.ChooseDate.Value.Month);
                firstDayOfMonth = new DateTime(request.ChooseDate.Value.Year, request.ChooseDate.Value.Month, 1);
                iQueryable = iQueryable.Where(m => m.StartDated.AddMonths((int)m.PackageType).Date >= request.ChooseDate.Value.Date);
            }
            else
            {
                iQueryable = iQueryable.Where(m => m.StartDated.AddMonths((int)m.PackageType).Date >= DateTime.Now.Date);
            }
            var courses = await iQueryable.Select(m => new CalendarDto
            {
                StartDated = m.StartDated.Date,
                Content = $"{m.ClassName}({m.Lesson.Time})",
                Id = m.Id,
                LessonId = m.LessonId,
                From = m.Lesson.From,
                To = m.Lesson.To,
                PackageType = (int)m.PackageType
            }).ToListAsync();
            var results = new List<CalendarDto>();
            if(courses != null && courses.Any())
            {
                foreach(var course in courses)
                {
                    for (var i = 0; i < days; i++)
                    {
                        if(firstDayOfMonth.AddDays(i).Date >= course.StartDated && firstDayOfMonth.AddDays(i).Date <= course.StartDated.AddMonths(course.PackageType))
                        {
                            var dayOfWeek = ((int)firstDayOfMonth.AddDays(i).DayOfWeek == 0) ? 7 : (int)firstDayOfMonth.AddDays(i).DayOfWeek;
                            /*** Case T2-T7 */
                            if (course.To == 7 && dayOfWeek <= 6)
                            {
                                results.Add(new CalendarDto
                                {
                                    Day = (i + 1),
                                    Content = course.Content,
                                    Id = course.Id,
                                    Month = request.ChooseDate.HasValue ? request.ChooseDate.Value.Month : DateTime.Now.Month,
                                    Year = request.ChooseDate.HasValue ? request.ChooseDate.Value.Year : DateTime.Now.Year
                                });
                            }
                            else if (course.To == 8 && dayOfWeek <= 8)
                            {
                                results.Add(new CalendarDto
                                {
                                    Day = (i + 1),
                                    Content = course.Content,
                                    Id = course.Id,
                                    Month = request.ChooseDate.HasValue ? request.ChooseDate.Value.Month : DateTime.Now.Month,
                                    Year = request.ChooseDate.HasValue ? request.ChooseDate.Value.Year : DateTime.Now.Year
                                });
                            }
                        }
                        
                    }
                }
            }
            return results;
        }
    }

    public interface ICourseService
    {
        Task<bool> CreateCourse(CourseInsertDto input);
        Task<List<CourseDto>> GetListCourse(string search = "");
        Task<CourseDto> GetCourseById(int id);
        Task<List<LessonDto>> GetLessons();
        Task<List<CalendarDto>> GetCalendars(CalendarRequest request = null);
    }
}
