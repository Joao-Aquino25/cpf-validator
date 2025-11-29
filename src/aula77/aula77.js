function checkCPF(submittedCPF) {
  this.cleanCPF = submittedCPF.replace(/\D/g, '');
}

checkCPF.prototype.check = function () {
  if (!this.cleanCPF) return false;
  if (this.cleanCPF.length !== 11) return false;
  if (this.isSequence()) return false;

  const partialCPF = this.cleanCPF.slice(0, -2);
  const firstCheckDigit = this.generateCheckDigit(partialCPF);
  const secondCheckDigit = this.generateCheckDigit(partialCPF + firstCheckDigit);

  const newCPF = partialCPF + firstCheckDigit + secondCheckDigit;

  return newCPF === this.cleanCPF;
};

checkCPF.prototype.generateCheckDigit = function (partialCPF) {
  const cpfArray = Array.from(partialCPF);
  let regressive = cpfArray.length + 1;
  let total = cpfArray.reduce((ac, val) => {
    ac += regressive * Number(val);
    regressive--;
    return ac;
  }, 0);

  const digit = 11 - (total % 11);
  return digit > 9 ? '0' : String(digit);
};

checkCPF.prototype.isSequence = function () {
  const sequence = this.cleanCPF[0].repeat(this.cleanCPF.length);
  return sequence === this.cleanCPF;
};

const cpf = new checkCPF('065.352.801-95');

if (cpf.check()) {
  console.log('CPF VÁLIDO!');
} else {
  console.log('CPF INVÁLIDO!');
}
