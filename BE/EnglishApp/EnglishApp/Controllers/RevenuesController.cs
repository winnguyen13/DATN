using EnglishApp.Models;
using EnglishApp.Models.Revenues;
using EnglishApp.Services.Revenue;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EnglishApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RevenuesController : ControllerBase
    {
        private readonly IRevenueService _revenueService;
        public RevenuesController(IRevenueService revenueService)
        {
            _revenueService = revenueService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = new ResponseDto<List<RevenueDto>>();
            try
            {
                var results = await _revenueService.GetListRenvenues();
                response.Data = results;
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }

        [HttpGet("{id}")]        
        public async Task<IActionResult> GetById(int id)
        {
            var response = new ResponseDto<RevenueDto>();
            try
            {
                var result = await _revenueService.GetRevenueById(id);
                if(result == null) response.Status = false;
                response.Data = result;
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RevenueInsertDto request)
        {
            var response = new ResponseDto<RevenueDto>();
            try
            {
                var result = await _revenueService.CreateRevenue(request);
                response.Status = result;
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = $"Lỗi hệ thống - {ex.Message}!";
            }
            return new ObjectResult(response);
        }
    }
}
