import './BottomButtonBarStyle.scss';
import Button from '../../ui-kit/Button/Button';

export default function BottomButtonBar() {
  return (
    <section className="bottom-button-bar-section">
      <div className="bottom-button-bar-wrap">
        <div className="bottom-button-bar-box">
          <div className="btn-box">
            <Button buttonVariant='secondary'>Next</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
