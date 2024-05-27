using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario ben = new DAL.Beneficiarios.DaoBeneficiario();
            return ben.Incluir(beneficiario);
            
        }

        public DML.Beneficiario Consultar(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.Consultar(id);
        }

        public List<DML.Beneficiario> ListarPorIdCliente(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.Listar(id);
        }
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }

        public void Excluir(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            cli.Excluir(id);
        }
    }
}
