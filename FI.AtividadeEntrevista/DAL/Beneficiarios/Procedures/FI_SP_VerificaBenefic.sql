CREATE PROC FI_SP_VerificaBenefic
    @CPF VARCHAR(14)
AS
BEGIN
    DECLARE @Exists INT;

    IF EXISTS (SELECT 1 FROM Clientes WHERE CPF = @CPF)
        SET @Exists = 1;
    ELSE
    BEGIN
        IF EXISTS (SELECT 1 FROM Beneficiario WHERE CPF = @CPF)
            SET @Exists = 1;
        ELSE
            SET @Exists = 0;
    END

    SELECT @Exists AS CPF_Existente;
END