import ApplePay from "./apple-pay";
import GooglePay from "./google-pay";
import Visa from "./visa";
import MasterCard from "./master-card";
import ShopPay from "./shop-pay";
import Amex from "./amex";
import DinersClub from "./diners-club";
import Discover from "./discover";
import Elo from "./elo";
import JCB from "./jcb";

export default function PaymentMethods() {
  return (
    <div>
      <span className="sr-only" aria-hidden="true">Payment Methods</span>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <Amex />
        <Visa />
        <MasterCard />
        <Discover />
        <Elo />
        <GooglePay />
        <ApplePay />
        <DinersClub />
        <JCB />
        <ShopPay />
      </div>
    </div>
  );
}