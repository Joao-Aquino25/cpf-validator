class CheckCPF {
  constructor(submittedCPF) {
    this.cleanCPF = submittedCPF.replace(/\D/g, '');
    this.newCPF = null;
  }

  isSequence() {
    if (!this.cleanCPF) return false;
    return this.cleanCPF === this.cleanCPF[0].repeat(this.cleanCPF.length);
  }

  generateNewCPF() {
    const partialCPF = this.cleanCPF.slice(0, -2);
    const firstCheckDigit = this.generateCheckDigit(partialCPF);
    const secondCheckDigit = this.generateCheckDigit(partialCPF + firstCheckDigit);
    this.newCPF = partialCPF + firstCheckDigit + secondCheckDigit;

    return this.newCPF;
  }

  generateCheckDigit(partialCPF) {
    let total = 0;
    let regressive = partialCPF.length + 1;

    for (let digit of partialCPF) {
      total += regressive * Number(digit);
      regressive--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  check() {
    if (!this.cleanCPF) return false;
    if (this.cleanCPF.length !== 11) return false;
    if (this.isSequence()) return false;
    this.generateNewCPF();

    return this.newCPF === this.cleanCPF;
  }
}

let cpf = new CheckCPF('065.352.801-95');

if (cpf.check()) {
  console.log('CPF Válido.');
} else {
  console.log('CPF Inválido!');
}
