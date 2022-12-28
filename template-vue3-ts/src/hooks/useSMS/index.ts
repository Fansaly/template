import Cookies from 'js-cookie';
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue';

export interface SMSProps {
  remaining?: number;
  validate?: () => Promise<void>;
  fetch: () => Promise<void>;
}

export const useSMS = ({ remaining = 60, validate, fetch }: SMSProps) => {
  const options = {
    time: remaining,
    key: 'SMSTIME',
    text: {
      default: '获取验证码',
      suffix: 's 后重新获取',
    },
  };
  const timer = ref<null | ReturnType<typeof setInterval>>(null);
  const state: {
    timing: boolean;
    text: string;
  } = reactive({
    timing: false,
    text: '',
  });

  const fetchSMS = async () => {
    try {
      state.timing = true;
      await validate?.();

      const now = new Date().getTime();
      const time = options.time;
      const expires = new Date(now + time * 1e3);

      await fetch();
      Cookies.set(options.key, now as unknown as string, { expires });
      smsTimer(time);
    } catch (err) {
      state.timing = false;
      console.error('error in fetchSMS of useSMS', err);
    }
  };

  const smsTimer = async (time = 60, step = 1) => {
    smsTimerExecutor(time);
    timer.value = setInterval(() => {
      time -= step;
      smsTimerExecutor(time);
    }, step * 1e3);
  };
  const smsTimerExecutor = (time = 0) => {
    if (time > 0) {
      state.timing = true;
      state.text = `${time}${options.text.suffix}`;
    } else {
      state.text = options.text.default;
      state.timing = false;
      if (timer.value !== null) {
        clearInterval(timer.value);
      }
    }
  };

  onBeforeMount(() => {
    const result = parseInt(Cookies.get(options.key) || '');
    state.timing = Number.isFinite(result);

    if (!result) {
      state.text = options.text.default;
    } else {
      let time = (new Date().getTime() - result) / 1e3;
      time = options.time - Math.floor(time);
      state.text = `${time}${options.text.suffix}`;
      smsTimer(time);
    }
  });

  onBeforeUnmount(() => {
    if (timer.value !== null) {
      clearInterval(timer.value);
    }
  });

  return { state, fetchSMS };
};
