import React, { use, useEffect, useState } from 'react';  
import styles from "./Home.module.css"
import Card from '../components/Card/Card';
import Modal from '../components/Modals/Modal';
import ExpenseForm from '../components/Forms_blank/AddExpensesForm/ExpensesForm';
import AddBalanceForm from '../components/Forms_blank/BalanceForm/AddBalanceForm';
import PieChartComponent from '../components/PieCharts/PieCharts';
import { BarChart, Pie } from 'recharts';


export default function Home() {

  const [expenses, setExpenses] = useState(0);
  const [expendesList, setExpendesList] = useState(0);
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
   const localBalanceData = localStorage.getItem('balanceData');
    if (localBalanceData) {
      setBalance(Number(localBalanceData));

    } else {
      setBalance(5000);
      localStorage.setItem('balanceData', '5000');

    }
    const items = JSON.parse(localStorage.getItem('expensesData')) 
    setExpendesList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('balanceData', balance);
    }
    },[balance]); 

   useEffect(() => {
    if (expendesList.length > 0 || isMounted) {
      localStorage.setItem('expensesData', JSON.stringify(expendesList));
    } 
    if (expendesList.length > 0) {
      setExpenses(
        expendesList.reduce((total, currentValue) => total + Number(currentValue.price), 0)
      );
    } else{
      setExpenses(0); 
    }
    let foodTotal = 0;
    let travelTotal = 0;
    let entertainmentTotal = 0;
    let foodCount = 0,
     travelCount = 0,
     entertainmentCount = 0;

    // expendesList.forEach((item) => {
    //   if (item.category === 'food') {
    //     foodTotal += Number(item.price);
    //     foodCount += 1;
    //   } else if (item.category === 'travel') {
    //     travelTotal += Number(item.price);
    //     travelCount += 1;
    //   } else if (item.category === 'entertainment') {
    //     entertainmentTotal += Number(item.price);
    //     entertainmentCount += 1;
    //   }
    // });

    setCategorySpendsList({
      food: foodTotal,
      travel: travelTotal,
      entertainment: entertainmentTotal
    });

    setCategoryCounts({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount
    });
    }, [expendesList]);

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

          <PieChartComponent
          data={[
            { name: 'Food', value: categorySpendsList.food }, 
            { name: 'Travel', value: categorySpendsList.travel },
            { name: 'Entertainment', value: categorySpendsList.entertainment }
          ]}
          />
          </div>
        <div className={styles.transactionsWrapper}>
          {/* <TransactionsList
          transactions= {expendesList}
          editTransactions={setExpendesList}
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
        />   */}
        </div>

        <Modal isOpen={isOpenAddExpense} setIsOpen={setIsOpenAddExpense}>
          <ExpenseForm
          setIsOpen={setIsOpenAddExpense}
          expendesList={expendesList}
          setExpendesList={setExpendesList}
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









