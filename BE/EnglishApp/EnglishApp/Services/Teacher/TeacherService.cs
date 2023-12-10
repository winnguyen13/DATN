using EnglishApp.Entity;
using EnglishApp.Models.Teachers;
using EnglishApp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.Services.Teacher
{
    public class TeacherService : GenericRepository<TeacherEntity, EnglishContext>, ITeacherService
    {
        public async Task<bool> CreateTeacher(TeacherInsertDto input)
        {
            var entity = new TeacherEntity()
            {
                Address = input.Address,
                Education = input.Education,
                Email = input.Email,
                GenderId = input.GenderId,
                Name = input.Name,
                Phone = input.Phone,
                CreatedAt = DateTime.Now
            };
            englishContext.Teachers.Add(entity);
            var flag = await englishContext.SaveChangesAsync();
            return flag > -1;
        }

        public async Task<TeacherDto> GetTeacherById(int Id)
        {
            var iQueryable = englishContext.Teachers.AsQueryable();
            iQueryable = iQueryable.Where(m => m.Id == Id);
            var results = await iQueryable.Select(m => new TeacherDto
            {
                Address = m.Address,
                Education = m.Education,
                Email = m.Email,
                GenderId = m.GenderId,
                Name = m.Name,
                Phone = m.Phone,
                Id = m.Id
            }).FirstOrDefaultAsync();
            return results;
        }

        public async Task<List<TeacherDto>> GetTeacherList(string search = "")
        {
            var iQueryable = englishContext.Teachers.AsQueryable();
            if(!string.IsNullOrWhiteSpace(search))
            {
                iQueryable = iQueryable.Where(m => EF.Functions.Like(m.Name.ToLower(), $"%{search.ToLower()}%") || EF.Functions.Like(m.Email.ToLower(), $"%{search.ToLower()}%"));
            }

            var results = await iQueryable.Select(m => new TeacherDto
            {
                Address = m.Address,
                Education = m.Education,
                Email = m.Email,
                GenderId = m.GenderId,
                Name = m.Name,
                Phone = m.Phone,
                Id = m.Id
            }).ToListAsync();
            return results;
        }

        public async Task<int> GetTotalTeacher()
        {
            var iQueryable = englishContext.Teachers.AsQueryable();
            return await iQueryable.CountAsync();
        }
    }

    public interface ITeacherService 
    {
        Task<bool> CreateTeacher(TeacherInsertDto input);
        Task<List<TeacherDto>> GetTeacherList(string search = "");
        Task<TeacherDto> GetTeacherById(int Id);
        Task<int> GetTotalTeacher();
    }
}
