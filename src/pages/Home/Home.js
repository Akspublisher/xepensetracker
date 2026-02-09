import React, { useEffect, useState } from 'react';  
import styles from "./Home.module.css"
import Card from '../../components/Card/Card';
import PieChart from '../../components/PieChart/PieChart';

export default function Home() {

  const [expenses, setExpenses] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [balance, setBalance] = useState(0);  
  const [isMounted, setIsMounted] = useState(false);

  // modals
  const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);
  const [isOpenAddBalance, setIsOpenAddBalance] = useState(false);
  
  const [categorySpendsList, setCategorySpendsList] = useState({
    food: 0,
    travel: 0,
    entertainment: 0
  }); 
  const [categoryCounts, setCategoryCounts] = useState({
    food: 0,
    travel: 0,
    entertainment: 0
  });


    useEffect(() => {
    //Check localStorage
    const localBalance = localStorage.getItem("balance");

    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpensesList(items || []);
    setIsMounted(true);
  }, []);

 useEffect(() => {
    if (expensesList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expensesList));
    }

    if (expensesList.length > 0) {
      setExpenses(
        expensesList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpenses(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expensesList.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpendsList({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCounts({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expensesList]);

  // saving balance in localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className={styles.container}>
   
    <h1>Expense Tracker</h1>
    
    <div className={styles.cardsWrapper}>
          <Card
          title="Wallet Balance"
          value={balance}
          buttonText="+ Add Income" 
          buttontype="success"  
          handleClick={() => setIsOpenAddBalance(true)}
          />
          <Card 
          title="Expenses"
          value={expenses}
          buttonText="+ Add Expense"
          buttontype="failure"
          success={false}       
          handleClick={() => setIsOpenAddExpense(true)}
          />

          <PieChart
          data={[
            { name: 'Food', value: categorySpendsList.food }, 
            { name: 'Travel', value: categorySpendsList.travel },
            { name: 'Entertainment', value: categorySpendsList.entertainment }
          ]}
          />
      </div>      
    </div>
  );
}