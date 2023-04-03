//Aula: Usando classes valiando CPF
//CPFs: 705.484.450-52 | 070.987.720-03

class ValidaCPF{

    constructor(cpfEnviado){
        
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true, //exibe a propriedade "cpfLimpo"
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '') //expressão regular que remove qualquer coisa que não seja número.
        });
    }

    éSequencia(){ //JS permite acento nas palavras

        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCPF(){

        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);

        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigito(cpfSemDigitos){ //Note que essa função não utiliza "this", então pode usar como static (estático);

        let total = 0;
        let reverso = cpfSemDigitos.length + 1; // 9 + 1 = 10

        for(let stringNumerica of cpfSemDigitos){
            
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida(){

        if(!this.cpfLimpo) 
            return false; //se não existir a variavel "cpfLimpo" nao faz nada.
       
        if(typeof this.cpfLimpo !== "string")
             return false;
       
        if(this.cpfLimpo.length !== 11) 
            return false;

        if(this.éSequencia())
            return false;
        
        this.geraNovoCPF();
        
        return this.novoCPF === this.cpfLimpo;
    }
}

let validaCPF = new ValidaCPF('070.987.720-03');

if(validaCPF.valida())
    console.log("CPF válido.");
else
    console.log("CPF inválido.");