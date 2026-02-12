import React, { useEffect, useState } from 'react';  
import styles from "./Home.module.css"
import Card from '../../components/Card/Card';
import PieChart from '../../components/PieChart/PieChart';
import TransactionList from '../../components/TransactionCardList/TransactionList';
import Modal from '../../components/Modals/Modal';
import ExpenseForm from '../../components/Forms_blank/AddExpensesForm/ExpensesForm';
import AddBalanceForm from '../../components/Forms_blank/BalanceForm/AddBalanceForm';
import BarChart from '../../components/BarChart/BarChart';



export default function Home() {

  const [expenses, setExpenses] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [balance, setBalance] = useState(0);  
  const [isMounted, setIsMounted] = useState(false);

  // modals
  const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);
  const [isOpenAddBalance, setIsOpenAddBalance] = useState(false);
 // console.log(isOpenAddBalance, isOpenAddExpense )
  
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
          handleClick={() =>  setIsOpenAddBalance(true)}
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
      <div className={styles.transactionsWrapper}>
          <TransactionList
            transactions={expensesList}
           editTransactions={setExpensesList}
           title="Recent Transactions"
           balance={balance}
           setBalance={setBalance}
         /> 

          <BarChart
          data={[
            { name: 'Food', value: categorySpendsList.food },
            { name: 'Travel', value: categorySpendsList.travel },
            { name: 'Entertainment', value: categorySpendsList.entertainment }
          ]}
        />  

         </div>
         
          {/* <Modal isOpen={isOpenAddExpense} setIsOpen={setIsOpenAddExpense}>
          <ExpenseForm
          setIsOpen={setIsOpenAddExpense}
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          balance={balance}
          setBalance={setBalance}
          />
        </Modal>

        <Modal isOpen={isOpenAddBalance} setIsOpen={setIsOpenAddBalance}>
          <AddBalanceForm 
          setIsOpen={setIsOpenAddBalance}
          balance={balance}
          setBalance={setBalance}
          />
        </Modal>

        <Modal isOpen={isOpenAddBalance} setIsOpen={setIsOpenAddBalance}>
          <AddBalanceForm
          setIsOpen={setIsOpenAddBalance}
          setBalance={setBalance}
          />
        </Modal>       */}
         {/* <Modal isOpen={isOpenAddExpense} setIsOpen={setIsOpenAddExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenAddExpense}
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpenAddBalance} setIsOpen={setIsOpenAddBalance}>
        <AddBalanceForm setIsOpen={setIsOpenAddBalance} setBalance={setBalance} />
      </Modal> */}
      <Modal isOpen={isOpenAddExpense} setIsOpen={setIsOpenAddExpense}>
          <ExpenseForm
          setIsOpen={setIsOpenAddExpense}
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          balance={balance}
          setBalance={setBalance}
          />
        </Modal>

        <Modal isOpen={isOpenAddBalance} setIsOpen={setIsOpenAddBalance}>
          <AddBalanceForm 
          setIsOpen={setIsOpenAddBalance}
          balance={balance}
          setBalance={setBalance}
          />
        </Modal>

        <Modal isOpen={isOpenAddBalance} setIsOpen={setIsOpenAddBalance}>
          <AddBalanceForm
          setIsOpen={setIsOpenAddBalance}
          setBalance={setBalance}
          />
        </Modal>

    </div>
  );
}