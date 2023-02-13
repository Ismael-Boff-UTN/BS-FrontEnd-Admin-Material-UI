import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@material-ui/core";
import axios from "axios";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Ganancias() {
  const theme = useTheme();
  const [ganancias, setGanancias] = useState([]);

  useEffect(() => {
    
    axios
      .get(
        "http://localhost:4000/api/auditoria/ganancias/?fechaInicial=2021-07-06T12:00:00.773Z&fechaFinal=2021-07-07T16:00:00.773Z"
      )
      .then((response) => {
        // Obtenemos los datos

        setGanancias(response.data);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, []);

  const data = [
    createData("08:00", ganancias.totalGanancias),
    createData("09:00", ganancias.totalGanancias * 1),
    createData("12:00", ganancias.totalGanancias * 1.5),
    createData("15:00", ganancias.totalGanancias * 2),
    createData("18:00", ganancias.totalGanancias * 2.5),
    createData("20:00", ganancias.totalGanancias * 3),
  ];

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Ganancias De Todos Los Tiempos $ ({ganancias.totalGanancias})
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Ganancias ($)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
