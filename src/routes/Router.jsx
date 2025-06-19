import { createBrowserRouter } from "react-router-dom";
import React from 'react';
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RecentGames from "../pages/Recent-Games";
import Home from "../pages/Home";
import Raffle from "../pages/Raffle";
import LeaderBoard from "../pages/LeaderBoard";
import Chat from "../pages/Chat";
import Games from "../pages/Games";
import TopWins from "../pages/Top-wins";
import TopLosses from "../pages/Top-Losses";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Withdraw from "../pages/withdraw";
import Deposit from "../pages/Deposit";
import WithdrawalHistory from "../pages/WithdrawalHistory ";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import VerifyEmail from "../auth/VerifyEmail";
import UserProfile from "../pages/UserProfile";
import TransactionHistory from "../pages/TransactionHistory";
import VerifyAccount from "../pages/VerifyAccount";
import DepositHistory from "../pages/DepositHistory";
import SettingsPage from "../pages/Settings";


export const Element = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "game",
        element: <Games/>
      },
      {
        path: "raffle",
        element: <Raffle />

      },
      {
        path: "leaderboard",
        element: <LeaderBoard />
      },
      {
        path: "chat",
        element: <Chat />
      },
      {
        path: "/history/recent-games",
        element: <RecentGames />
      },
      {
        path: "/history/top-wins",
        element: <TopWins />
      },
      {
        path: "/history/top-losses",
        element: <TopLosses />
      },
    ],
  },

  {
      element: <DashboardLayout />,
      children: [
      {
         path: "dashboard",
         element: <Dashboard/>
      },
      {
         path: "withdraw",
         element: <Withdraw/>
      },
      {
         path: "deposit",
         element: <Deposit/>
      },
      {
         path: "Withdrawal-History",
         element: <WithdrawalHistory/>
      },
      {
         path: "Deposit-History",
         element: <DepositHistory/>
      },
      {
         path: "User-profile",
         element: <UserProfile/>
      },
      {
         path: "transactions-history",
         element: <TransactionHistory/>
      },
      {
         path: "verify-account",
         element: <VerifyAccount/>
      },
      {
         path: "settings",
         element: <SettingsPage/>
      },
      ]
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "signup",
      element: <Signup />
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "reset-password",
      element: <ResetPassword />
    },
    {
      path: "verify-account",
      element: <VerifyEmail />
    },
]);