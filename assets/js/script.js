const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
  event.preventDefault();

  const gender = getSelectedValue('gender');
  const age = getInputNumberValue('age');
  const weight = getInputNumberValue('weight');
  const height = getInputNumberValue('height');
  const activityLevel = getSelectedValue('activity_level');
  const target = getSelectedValue('target');

  /*
  const tmb = Math.round(
    gender === 'female'
    ? (655 + (9.6 * weight) + (1.9 * height) - (4.7 *age)) //if (cálculo pronto)
    : (66 + (13.8 * weight) + (5 * height) - (6.8 *age)) //else
  );*/

  const tmb = calcMifflin(weight, height, age, gender);

  const maintenance = Math.round(tmb * Number(activityLevel));

  const loseWeight = target === 'cutting' ? maintenance - 450 : maintenance + 450;

  const targetTitle = target === 'cutting' ? 'Lose Fat' : 'Lean Mass Gain';
  const targetSubTitle = target === 'cutting' ? 'DCA / CAD: ' : 'GCA / CAG: ';
  //const loseWeight = maintenance - 450;
  //const gainWeight = maintenance + 450;

  const carbo = Math.round((loseWeight * 0.60) / 4);
  const protein = Math.round((loseWeight * 0.20) / 4);
  const gordura = Math.round((loseWeight * 0.20) / 9);
  const imc = calcIMC(weight, height);

  //resultados da cálculo para exibir na tela
  const layout = `
    <h4>${targetTitle}</h4>
    <br>
    <div class="result-content">
      <ul>
      <br><br>
      <h5>Your indexes</h5>
      <br>
      <li>
          IMC / BMI: <strong>${imc} </strong>
        </li>
        <li>
        ENA / ERB: <strong>${maintenance} </strong>kcal<br>
        </li>
        <li>
          ${targetSubTitle} <strong>450</strong> kcal
        </li>
        <li>
          END / ERA: <strong>${loseWeight} </strong>kcal<br>
        </li>
        <li>
          TMB / BMR: <strong>${tmb} </strong>
        </li>
      <br><br>
      <h5>Macronutrients per day</h5>
      <br>
        <li>
          Carbohydrates: <strong> ${carbo} </strong>g<br>
          Proteins: <strong> ${protein} </strong>g<br>
          Lipids: <strong> ${gordura} </strong>g<br>
        </li>
        
        <br>
      </ul>
  `;

  const result = document.getElementById('result');

  result.innerHTML = layout; //repassando que o layout deve ser exibido na tela
}

function getSelectedValue(id) {
  const select = document.getElementById(id);

  return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}

const calcBenedict = (weight, size, age, gender) => {
    if (gender === "male"){
        return Math.round(66.5+(13.75*weight)+(5*size)-(6.78*age));
    }
    else{
        return Math.round(655+(9.6*weight)+(1.85*size)-(4.68*age));
    }
}

const calcMifflin = (weight, height, age, gender) => {
    if (gender === "male"){
        return Math.round((10*weight) + (6.25*height) - (5*age) + 5);
    }
    else{
        return Math.round((10*weight) + (6.25*height) - (5*age) - 161);
    }
}

const calcIMC = (weight, size) => {
  return (weight / ((size / 100) * (size / 100))).toFixed(2);
}