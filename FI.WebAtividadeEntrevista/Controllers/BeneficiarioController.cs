using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                try
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IdCliente = model.IdCliente
                    });

                    return Json("Cadastro efetuado com sucesso");
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 400;
                    return Json(ex.Message);
                }
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                try
                {
                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,
                        Nome = model.Nome,
                        CPF = model.CPF
                    });

                    return Json("Cadastro atualizado com sucesso");
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 400;
                    return Json(ex.Message);
                }

            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario ben = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (ben != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = ben.Id,
                    Nome = ben.Nome,
                    CPF = ben.CPF
                };


            }

            return View(model);
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long idCliente)
        {
            
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().ListarPorIdCliente(idCliente);

                return Json(new { Result = "OK", Records = beneficiarios });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult GetBeneficiarioPorId(long idCliente, long idBeneficiario)
        {

            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().ListarPorIdCliente(idCliente);
                var model = beneficiarios.Where(x => x.Id == idBeneficiario).FirstOrDefault();

                return Json(new { Result = "OK", Records = model });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpDelete]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            try
            {
                bo.Excluir(id);
                return Json("Beneficiario excluido com sucesso");
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return Json(ex.Message);
            }
        }
    }
}
