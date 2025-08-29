import express from "express";

const app = express();
app.use(express.json());

// My details
const FULL_NAME = "vedant_girawale";
const DOB = "15102004";
const EMAIL = "vedant.22bce7674@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE7674";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input",
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let lettersForConcat = [];

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // it's a number
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
        lettersForConcat.push(item);
      } else {
        special_characters.push(item);
      }
    });

    let concat_string = lettersForConcat
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
