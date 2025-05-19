document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("renaissanceImpactChart").getContext("2d");

  const categories = ["Искусство", "Наука", "Философия", "Архитектура", "Литература"];
  const dataValues = [95, 85, 80, 75, 70];

  const chartData = {
    labels: categories,
    datasets: [{
      label: "Влияние (в условных единицах)",
      data: [...dataValues],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)"
      ],
      borderWidth: 1
    }]
  };

  const renaissanceChart = new Chart(ctx, {
    type: "doughnut",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Основные направления влияния Ренессанса"
        },
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Уровень влияния" }
        }
      }
    }
  });

  // Функция скрытия/показа столбца по индексу
  window.toggleCategory = (index) => {
    const dataset = renaissanceChart.data.datasets[0];

    if (dataset._hiddenIndexes === undefined) {
      dataset._hiddenIndexes = new Set();
    }

    if (dataset._hiddenIndexes.has(index)) {
      dataset._hiddenIndexes.delete(index);
      dataset.data[index] = dataValues[index];
    } else {
      dataset._hiddenIndexes.add(index);
      dataset.data[index] = 0; // Скрываем, устанавливая в 0
    }

    renaissanceChart.update();
  };
});
