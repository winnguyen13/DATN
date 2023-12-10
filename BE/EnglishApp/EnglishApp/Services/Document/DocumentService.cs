using EnglishApp.Entity;
using EnglishApp.Models.Documents;
using EnglishApp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishApp.Services.Document
{
    public class DocumentService : GenericRepository<DocumentEntity, EnglishContext>, IDocumentService
    {
        public async Task<bool> CreateDocument(DocumentInsertDto input)
        {
            var entity = new DocumentEntity()
            {
                CreatedAt = DateTime.Now,
                Description = input.Description,
                DocumentSize = input.DocumentSize,
                FileName = input.FileName,
                Name = input.Name,
                DisplayName = input.DisplayName,
            };
            englishContext.Documents.Add(entity);
            var flag = await englishContext.SaveChangesAsync();
            return flag > -1;
        }

        public async Task<DocumentDto> GetDocumentById(int Id)
        {
            var iQueryable = englishContext.Documents.AsQueryable();
            iQueryable = iQueryable.Where(m => m.Id == Id);
            var data = await iQueryable.Select(m => new DocumentDto
            {
                Description = m.Description,
                DocumentSize = m.DocumentSize,
                FileName = m.FileName,
                Id = m.Id,
                Name = m.Name,
                DisplayName = m.DisplayName,
            }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<DocumentDto>> GetListDocument()
        {
            var iQueryable = englishContext.Documents.AsQueryable();
            var data = await iQueryable.Select(m => new DocumentDto
            {
                Description = m.Description,
                DocumentSize = m.DocumentSize,
                FileName = m.FileName,
                Id = m.Id,
                Name = m.Name,
                CreatedAt = m.CreatedAt
            }).ToListAsync();
            return data;
        }
    }

    public interface IDocumentService
    {
        Task<bool> CreateDocument(DocumentInsertDto input);
        Task<List<DocumentDto>> GetListDocument();
        Task<DocumentDto> GetDocumentById(int Id);
    }
}
