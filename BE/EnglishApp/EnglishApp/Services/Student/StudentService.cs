﻿using EnglishApp.Entity;
using EnglishApp.Models.Dashboards;
using EnglishApp.Models.Students;
using EnglishApp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.Services.Student
{
    public class StudentService : GenericRepository<StudentEntity, EnglishContext>, IStudentService
    {
        public async Task<bool> CreateStudent(StudentInsertDto input)
        {
            var entity = new StudentEntity()
            {
                Address = input.Address,
                ClassId = input.ClassId,
                Email = input.Email,
                GenderId = input.GenderId,
                Name = input.Name,
                Phone = input.Phone,
                CreatedAt = DateTime.Now
            };
            englishContext.Students.Add(entity);
            var flag = await englishContext.SaveChangesAsync();
            return flag > -1;
        }

        public async Task<List<StudentDto>> GetListStudent(string search = "")
        {
            var iQueryable = englishContext.Students.Join(englishContext.Courses, st => st.ClassId, c => c.Id, (st, c) => new { st, c });
            if(!string.IsNullOrWhiteSpace(search))
            {
                iQueryable = iQueryable.Where(m => EF.Functions.Like(m.st.Name.ToLower(), $"%{search.ToLower()}%") || EF.Functions.Like(m.st.Email.ToLower(), $"%{search.ToLower()}%"));
            }
            var data = await iQueryable.Select(m => new StudentDto
            {
                Address = m.st.Address,
                ClassId = m.st.ClassId,
                Email = m.st.Email,
                GenderId = m.st.GenderId,
                Name = m.st.Name,
                Phone = m.st.Phone,
                Id = m.st.Id,
                ClassName = m.c.ClassName,
                CourseName = m.c.Name
            }).ToListAsync();
            return data;
        }

        public async Task<StudentDto> GetStudentById(int Id)
        {
            var iQueryable = englishContext.Students.Join(englishContext.Courses, st => st.ClassId, c => c.Id, (st, c) => new { st, c });
            iQueryable = iQueryable.Where(m => m.st.Id == Id);
            var data = await iQueryable.Select(m => new StudentDto
            {
                Address = m.st.Address,
                ClassId = m.st.ClassId,
                Email = m.st.Email,
                GenderId = m.st.GenderId,
                Name = m.st.Name,
                Phone = m.st.Phone,
                Id = m.st.Id,
                ClassName = m.c.ClassName,
                CourseName = m.c.Name
            }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<int> GetTotalStudent()
        {
            var iQueryable = englishContext.Students.AsQueryable();
            return await iQueryable.CountAsync();
        }

        public List<DashboardChartDto> GetDashboardCharts()
        {
            var iQueryable = englishContext.Students.AsQueryable();
            iQueryable = iQueryable.Where(m => m.CreatedAt.Year == DateTime.Now.Year);
            var data = iQueryable.AsEnumerable().GroupBy(m => m.CreatedAt.Month).Select(m => new DashboardChartDto
            {
                Month = m.Key.ToString(),
                Value = m.Count()
            }).ToList();
            if(data != null && data.Any())
            {
                data.ForEach(m =>
                {
                    m.Month = ConvertMonths(m.Month);
                });
            }
            return data;
        }

        private string ConvertMonths(string month)
        {
            string strMonth = "";
            switch(month)
            {
                case "1":
                    strMonth = "Jan";
                    break;
                case "2":
                    strMonth = "Feb";
                    break;
                case "3":
                    strMonth = "Mar";
                    break;
                case "4":
                    strMonth = "April";
                    break;
                case "5":
                    strMonth = "May";
                    break;
                case "6":
                    strMonth = "Jun";
                    break;
                case "7":
                    strMonth = "Jul";
                    break;
                case "8":
                    strMonth = "Aug";
                    break;
                case "9":
                    strMonth = "Sept";
                    break;
                case "10":
                    strMonth = "Oct";
                    break;
                case "11":
                    strMonth = "Nov";
                    break;
                case "12":
                    strMonth = "Dec";
                    break;
            }
            return strMonth;
        }
    }

    public interface IStudentService
    {
        Task<bool> CreateStudent(StudentInsertDto input);
        Task<List<StudentDto>> GetListStudent(string search = "");
        Task<StudentDto> GetStudentById(int Id);
        Task<int> GetTotalStudent();
        List<DashboardChartDto> GetDashboardCharts();
    }
}
