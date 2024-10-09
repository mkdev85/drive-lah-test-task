import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseCircleSolidIcon from '../../assets/icons/Close-Circle-Solid';
import BottomButtonBar from '../../components/BottomButtonBar';
import { RootState } from '../../redux/slices';
import { updateCarListingProgressStatusStart } from '../../redux/slices/carListingProgressStatus';
import { loadDevicesStart, addDevicesStart } from '../../redux/slices/devices';
import { Device as ReduxDevice } from '../../redux/slices/devices';
import { ProgressStatus, ProgressStepName } from '../../services/carListingProgressStatus/types';
import FileUploader from '../../ui-kit/FileUploader/FileUploader';
import InputField from '../../ui-kit/InputField/InputField';
import SwitchInputField from '../../ui-kit/SwitchInputField/SwitchInputField';

import './Device.scss';

interface ErrorState {
  serialNumber: boolean;
}

const Device: React.FC = () => {
  const dispatch = useDispatch();
  const { devices } = useSelector((state: RootState) => state.devices);
  const navigate = useNavigate();

  const [localDevices, setLocalDevices] = useState<ReduxDevice[]>([
    {
      id: 1,
      deviceType: 'Primary GPS',
      serialNumber: '',
      isBringingOwnDevice: false,
      image: { fileName: '', fileData: '' },
    },
    {
      id: 2,
      deviceType: 'Secondary GPS',
      serialNumber: '',
      isBringingOwnDevice: false,
      image: { fileName: '', fileData: '' },
    },
    {
      id: 3,
      deviceType: 'Drive mate Go',
      serialNumber: '',
      isBringingOwnDevice: false,
      image: { fileName: '', fileData: '' },
    },
    {
      id: 4,
      deviceType: 'Lockbox',
      serialNumber: '',
      isBringingOwnDevice: false,
      image: { fileName: '', fileData: '' },
    },
  ]);

  const [errors, setErrors] = useState<{ [key: number]: ErrorState }>({});

  useEffect(() => {
    dispatch(loadDevicesStart());
  }, [dispatch]);

  useEffect(() => {
    if (devices.length) {
      setLocalDevices(devices);
    }
  }, [devices]);

  const validateFields = (updatedDevices: ReduxDevice[]) => {
    const newErrors: { [key: number]: ErrorState } = {};
    updatedDevices.forEach((device, index) => {
      newErrors[index] = {
        serialNumber:
          device.isBringingOwnDevice && (!device.serialNumber || device.serialNumber.trim() === ''),
      };
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    const updatedDevices = [...localDevices];
    updatedDevices[index] = { ...updatedDevices[index], [name]: value };
    validateFields(updatedDevices);
    setLocalDevices(updatedDevices);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedDevices = [...localDevices];
    updatedDevices[index] = {
      ...updatedDevices[index],
      isBringingOwnDevice: !updatedDevices[index].isBringingOwnDevice,
      serialNumber: !updatedDevices[index].isBringingOwnDevice
        ? ''
        : updatedDevices[index].serialNumber,
      image: !updatedDevices[index].isBringingOwnDevice
        ? { fileName: '', fileData: '' }
        : updatedDevices[index].image,
    };
    setLocalDevices(updatedDevices);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedDevices = [...localDevices];
      const reader = new FileReader();

      reader.onload = upload => {
        const fileData = upload.target?.result as string;
        updatedDevices[index] = {
          ...updatedDevices[index],
          image: { fileName: file.name, fileData },
        };
        setLocalDevices(updatedDevices);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDeviceData = (updatedDevices: ReduxDevice[]) => {
    dispatch(addDevicesStart(updatedDevices));
  };

  const onNext = () => {
    updateDeviceData(localDevices);
    dispatch(
      updateCarListingProgressStatusStart({
        name: ProgressStepName.Device,
        status: ProgressStatus.Completed,
      }),
    );
    navigate('/early-access');
  };

  const isDeviceInformationValid = () => {
    return localDevices.some(device => device.isBringingOwnDevice && !device.serialNumber.trim());
  };

  const onFileCancel = (index: number) => {
    const updatedDevices = [...localDevices];
    updatedDevices[index] = {
      ...updatedDevices[index],
      image: { fileName: '', fileData: '' },
    };
    setLocalDevices(updatedDevices);
  };

  return (
    <>
      <section className="device-section">
        <div className="device-wrap">
          <div className="section-heading-box">
            <h1 className="heading-text">Device management</h1>
            <h5 className="subheading-text">
              Add details of the device, if any already installed on your car. If none, then
              continue to the next step.
            </h5>
          </div>

          {localDevices.map((device, index) => (
            <div className="section-body-box">
              <div key={device.id} className="section-device-card">
                <div className="section-title-box">
                  <h2 className="title-text">Device {index + 1}</h2>
                </div>

                <div className="row g-3">
                  <div className="col-lg-6 col-md-12 col-12">
                    <InputField
                      id={`device-type-${index}`}
                      label="Device type"
                      name="deviceType"
                      value={device.deviceType}
                      placeholder="Primary GPS"
                      onChange={event => handleInputChange(event, index)}
                    />
                    {device.isBringingOwnDevice && (
                      <InputField
                        id={`serial-number-${index}`}
                        label="Serial number"
                        name="serialNumber"
                        value={device.serialNumber}
                        placeholder="Enter the serial number of the device"
                        onChange={event => handleInputChange(event, index)}
                        required
                        error={errors[index]?.serialNumber ? 'Serial number is required' : ''}
                      />
                    )}
                  </div>

                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="switch-btn-box">
                      <SwitchInputField
                        id={`switchOption-${index}`}
                        label="Bringing your own device?"
                        name="isBringingOwnDevice"
                        labelPosition="left"
                        checked={device.isBringingOwnDevice}
                        onChange={event => handleSwitchChange(event, index)}
                      />
                      <p className="text">
                        Toggle this on if you're bringing your own device. Leave it off if Drive
                        mate is to provide the device.
                      </p>
                    </div>

                    {device.isBringingOwnDevice && (
                      <>
                        {!device.image?.fileName && (
                          <FileUploader
                            id={`file-upload-${index}`}
                            label="Upload an image of the device"
                            name="file-upload"
                            onChange={e => handleFileChange(e, index)}
                            accept="image/*, .pdf"
                            multiple={false}
                          />
                        )}

                        {device.image?.fileName && (
                          <div className="selected-file-list-wrap">
                            <h4 className="title-text">Selected File:</h4>
                            <ul className="selected-file-list-box">
                              <li className="selected-file-list-item">
                                <div>
                                  <img height={100} width={100} src={device.image.fileData}></img>
                                  <div className='image-filename-box'>
                                    <span className='text'> {device.image?.fileName}</span>
                                    <span className="close-btn">
                                      <CloseCircleSolidIcon onClick={() => onFileCancel(index)} />
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <BottomButtonBar disabled={isDeviceInformationValid()} onClick={onNext} />
    </>
  );
};

export default Device;
