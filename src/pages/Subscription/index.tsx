import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LocationIcon from '../../assets/icons/Location';
import LockIcon from '../../assets/icons/Lock';
import MeterIcon from '../../assets/icons/Meter';
import BottomButtonBar from '../../components/BottomButtonBar';
import { RootState } from '../../redux/slices';
import { updateCarListingProgressStatusStart } from '../../redux/slices/carListingProgressStatus';
import {
  CardDetails,
  loadSubscriptionStart,
  submitSubscriptionStart,
  Subscription as SubscriptionType,
} from '../../redux/slices/subscriptions';
import { ProgressStatus, ProgressStepName } from '../../services/carListingProgressStatus/types';
import PaymentCardInputField from '../../ui-kit/PaymentCardInputField/PaymentCardInputField';
import RadioInputField from '../../ui-kit/RadioInputField/RadioInputField';
import CardValidator from '../../utils/CardValidator';

import './Subscription.scss';
import { Plan, PlanKey } from './types';

const Subscription = () => {
  const dispatch = useDispatch();
  const { data: subscriptionData } = useSelector((state: RootState) => state.subscription);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | ''>('');
  const navigate = useNavigate();

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
      setSelectedValue(subscriptionData.addOns.map(addOn => addOn.id).join(''));
      setCardDetails(subscriptionData.cardDetails);
    }
  }, [dispatch, subscriptionData]);

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

  const isCardInValid = (cardDetails: CardDetails) => {
    const updatedErrors: CardDetails = {
      cardNumber: CardValidator.validateCardNumber(cardDetails.cardNumber) || '',
      expiryDate: CardValidator.validateExpiryDate(cardDetails.expiryDate) || '',
      cvc: CardValidator.validateCVC(cardDetails.cvc) || '',
    };
    return !!(updatedErrors.cardNumber || updatedErrors.cvc || updatedErrors.expiryDate);
  };

  const handlePlanSelect = (plan: PlanKey) => {
    setSelectedPlan(plan);
    setSelectedValue('');
    if (isCardInValid(cardDetails)) {
      return;
    }
    updateSubscription({ selectedPlan: plan, addOns: [], cardDetails });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (isCardInValid(cardDetails)) {
      return;
    }
    updateSubscription({
      selectedPlan,
      addOns: plans[selectedPlan as PlanKey].addOns.filter(addOn => addOn.id === value),
      cardDetails,
    });
  };

  const handleCardDetailsChange = (cardDetails: CardDetails) => {
    setCardDetails(cardDetails);
    if (isCardInValid(cardDetails)) {
      return;
    }
    updateSubscription({
      selectedPlan,
      addOns: plans[selectedPlan as PlanKey].addOns.filter(addOn => addOn.id === selectedValue),
      cardDetails,
    });
  };

  const updateSubscription = (updatedData: SubscriptionType) => {
    dispatch(submitSubscriptionStart(updatedData));
  };

  const validateSubscriptionInformation = () => {
    if (!selectedPlan.trim() || !selectedPlan.length || isCardInValid(cardDetails)) {
      return true;
    }
    return false;
  };

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
                  <div className="col-xl-6 col-md-6 col-12" key={addOn.id}>
                    <div className="radio-btn-box">
                      <RadioInputField
                        id={addOn.id}
                        label={addOn.label}
                        name="radioOption"
                        value={addOn.id}
                        labelPosition="left"
                        checked={selectedValue === addOn.id}
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
                    onSave={handleCardDetailsChange}
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
