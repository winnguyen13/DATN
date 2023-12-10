using EnglishApp.Models;
using EnglishApp.Services.Student;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using EnglishApp.Models.Students;
using Microsoft.AspNetCore.Authorization;

namespace EnglishApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentsController : ControllerBase
    {
        private static IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StudentInsertDto input)
        {
            var response = new ResponseDto<StudentDto>();
            try
            {
                var result = await _studentService.CreateStudent(input);
                response.Status = result;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }

        [HttpGet]
        public async Task<IActionResult> Get(string search = "")
        {
            var response = new ResponseDto<StudentDto>();
            try
            {
                var result = await _studentService.GetListStudent(search);
                response.Data = result;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = new ResponseDto<StudentDto>();
            try
            {
                var result = await _studentService.GetStudentById(id);
                response.Data = result;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }
    }
}
