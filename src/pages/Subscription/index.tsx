import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LocationIcon from '../../assets/icons/Location';
import LockIcon from '../../assets/icons/Lock';
import MeterIcon from '../../assets/icons/Meter';
import BottomButtonBar from '../../components/BottomButtonBar';
import Loader from '../../components/Loader';
import { RootState } from '../../redux/slices';
import { updateCarListingProgressStatusStart } from '../../redux/slices/carListingProgressStatus';
import {
  CardDetails,
  loadSubscriptionStart,
  submitSubscriptionStart,
} from '../../redux/slices/subscriptions';
import { ProgressStatus, ProgressStepName } from '../../services/carListingProgressStatus/types';
import PaymentCardInputField from '../../ui-kit/PaymentCardInputField/PaymentCardInputField';
import RadioInputField from '../../ui-kit/RadioInputField/RadioInputField';
import CardValidator from '../../utils/CardValidator';

import './Subscription.scss';
import { Plan, PlanKey } from './types';

const plans: Record<PlanKey, Plan> = {
  justMates: {
    title: 'Just mates',
    price: 'Free',
    features: [
      { icon: <LocationIcon />, text: 'Bring your own GPS' },
      { icon: <MeterIcon />, text: 'Mileage reporting to be done by you' },
      { icon: <LockIcon />, text: 'In-person key handover to guests' },
    ],
    addOns: [{ id: 'addon1', label: 'BYO secondary GPS - $5/month' }],
  },
  goodMates: {
    title: 'Good mates',
    price: '$10 /month',
    features: [
      { icon: <LocationIcon />, text: 'Primary GPS included' },
      { icon: <MeterIcon />, text: 'Automated mileage calculations' },
      { icon: <LockIcon />, text: 'In-person key handover to guests' },
    ],
    addOns: [
      { id: 'addon1', label: 'BYO secondary GPS - $5/month' },
      { id: 'addon2', label: 'BYO lockbox - $10/month' },
    ],
  },
  bestMates: {
    title: 'Best mates',
    price: '$30 /month',
    features: [
      { icon: <LocationIcon />, text: 'Keyless access technology' },
      { icon: <MeterIcon />, text: 'Automated mileage calculations' },
      { icon: <LockIcon />, text: 'Remote handover to guests' },
    ],
    addOns: [
      { id: 'addon1', label: 'BYO secondary GPS - $5/month' },
      { id: 'addon2', label: 'Between trip insurance', comingSoon: true },
    ],
  },
};

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: subscriptionData, loading } = useSelector((state: RootState) => state.subscription);

  const [selectedAddOnValue, setselectedAddOnValue] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | ''>('');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  useEffect(() => {
    if (!subscriptionData) {
      dispatch(loadSubscriptionStart());
    } else {
      setSelectedPlan(subscriptionData.selectedPlan as PlanKey);
      setselectedAddOnValue(subscriptionData.addOns.map(addOn => addOn.id).join(''));
      setCardDetails(subscriptionData.cardDetails);
    }
  }, [dispatch, subscriptionData]);

  const handlePlanSelect = (plan: PlanKey) => {
    setSelectedPlan(plan);
    setselectedAddOnValue('');
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setselectedAddOnValue(value);
  };

  const handleCardDetailsChange = (fieldName: string, formattedValue: string) => {
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [fieldName]: formattedValue,
    }));
  };

  const isCardInValid = (cardDetails: CardDetails) => {
    const updatedErrors: CardDetails = {
      cardNumber: CardValidator.validateCardNumber(cardDetails.cardNumber) || '',
      expiryDate: CardValidator.validateExpiryDate(cardDetails.expiryDate) || '',
      cvc: CardValidator.validateCVC(cardDetails.cvc) || '',
    };
    return !!(updatedErrors.cardNumber || updatedErrors.cvc || updatedErrors.expiryDate);
  };

  const validateSubscriptionInformation = () => {
    if (!selectedPlan.length || !selectedAddOnValue.length || isCardInValid(cardDetails)) {
      return true;
    }
    return false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="subscription-section">
        <div className="subscription-wrap">
          <div className="section-heading-box">
            <h1 className="heading-text">Subscription plan</h1>
            <h5 className="subheading-text">
              Select the ideal subscription plan for your listing.
            </h5>
          </div>

          <div className="section-body-box">
            <div className="section-title-box">
              <h2 className="title-text">Select your plan</h2>
            </div>

            <div className="row g-3 card-row">
              {Object.entries(plans).map(([planKey, plan]) => (
                <div className="col-xl-4 col-lg-6 col-12" key={planKey}>
                  <div
                    className={`subscription-plan-card ${selectedPlan === planKey ? 'active-plan' : ''}`}
                    onClick={() => handlePlanSelect(planKey as PlanKey)}
                  >
                    <h5 className="card-heading">{plan.title}</h5>
                    <div className="plan-list-text-box">
                      {plan.features.map((feature, index) => (
                        <h6 className="text" key={index}>
                          {feature.icon} {feature.text}
                        </h6>
                      ))}
                    </div>
                    <h4 className="plan-amount-text">{plan.price}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPlan && (
            <div className="section-body-box">
              <div className="section-title-box">
                <h2 className="title-text">Select add-ons for your subscription</h2>
              </div>

              <div className="row g-3">
                {plans[selectedPlan].addOns.map(addOn => (
                  <div className="col-lg-6 col-md-12 col-12" key={addOn.id}>
                    <div className="radio-btn-box">
                      <RadioInputField
                        id={addOn.id}
                        label={addOn.label}
                        name="radioOption"
                        value={addOn.id}
                        labelPosition="left"
                        checked={selectedAddOnValue === addOn.id}
                        onChange={handleRadioChange}
                      />
                      {addOn.comingSoon && <span className="radio-badge">Coming Soon</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPlan && (
            <div className="section-body-box">
              <div className="section-title-box">
                <h2 className="title-text">Add card details</h2>
              </div>

              <div className="row g-3">
                <div className="col-xl-12 col-md-12 col-12">
                  <PaymentCardInputField
                    id="custom-input"
                    value={cardDetails}
                    onChange={handleCardDetailsChange}
                    required
                    helperText="You will not be charged right now. Subscription will only start once your listing is published and live."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="section-body-box">
            <div className="learn-more-text-box">
              <p className="text">
                Learn more about the plans here -{' '}
                <a href="#" className="link-text">
                  What is the right plan for me?
                </a>
              </p>
              <p className="text">
                You will be able to switch between plans easily later as well. Speak to our host
                success team if you need any clarifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BottomButtonBar
        disabled={validateSubscriptionInformation()}
        onClick={() => {
          dispatch(
            submitSubscriptionStart({
              selectedPlan,
              addOns: plans[selectedPlan as PlanKey].addOns.filter(
                addOn => addOn.id === selectedAddOnValue,
              ),
              cardDetails,
            }),
          );

          dispatch(
            updateCarListingProgressStatusStart({
              name: ProgressStepName.Subscription,
              status: ProgressStatus.Completed,
            }),
          );
          navigate('/device');
        }}
      />
    </>
  );
};

export default Subscription;
