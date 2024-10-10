import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Automotivo",
      "Eletrônicos",
      "Eletrodomésticos",
      "Livros",
      "Outros",
    ],
    datasets: [
      {
        label: "Produtos por Categoria",
        data: [0, 0, 0, 0, 0], // Inicialmente, os dados são 0
      },
    ],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        const products = response.data;

        const categoryCounts = {
          automotivo: 0,
          eletronico: 0,
          eletrodomestico: 0,
          livro: 0,
          outros: 0,
        };

        products.forEach((product) => {
          if (categoryCounts[product.category] !== undefined) {
            categoryCounts[product.category] += 1;
          }
        });

        setChartData({
          labels: [
            "Automotivo",
            "Eletrônicos",
            "Eletrodomésticos",
            "Livros",
            "Outros",
          ],
          datasets: [
            {
              label: "Produtos por Categoria",
              data: [
                categoryCounts.automotivo,
                categoryCounts.eletronico,
                categoryCounts.eletrodomestico,
                categoryCounts.livro,
                categoryCounts.outros,
              ],
              backgroundColor: " rgba(79, 70, 229, 0.5)",
              borderColor: "rgb(79, 70, 229, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log("Erro ao buscar produtos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Bar
        data={chartData} 
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              min: 1, 
              max: 10,
                ticks: {
                  stepSize: 1,
                }
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
