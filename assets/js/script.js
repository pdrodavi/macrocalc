const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
  event.preventDefault();

  const gender = getSelectedValue('gender');
  const age = getInputNumberValue('age');
  const weight = getInputNumberValue('weight');
  const height = getInputNumberValue('height');
  const activityLevel = getSelectedValue('activity_level');

  const tmb = Math.round(
    gender === 'female'
    ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 *age)) //if (cálculo pronto)
    : (66 + (13.7 * weight) + (5 * height) - (6.8 *age)) //else
  );

  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const carbo = Math.round((loseWeight * 0.60) / 4);
  const protein = Math.round((loseWeight * 0.20) / 4);
  const gordura = Math.round((loseWeight * 0.20) / 9);

  //resultados da cálculo para exibir na tela
  const layout = `
    <h4>Perca de gordura: Macronutrientes por dia</h4>
    <br>
    <div class="result-content">
      <ul>
      <br>
        <li>
          Carboidratos: <strong> ${carbo} </strong>g<br>
          Proteínas: <strong> ${protein} </strong>g<br>
          Gorduras: <strong> ${gordura} </strong>g<br>
        </li>
        <li><br>
          Consumo médio: <strong>${loseWeight} </strong>kcal por dia<br>
        </li>
        <li>
          Seu metabolismo basal é de <strong>${tmb} </strong>kcal
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