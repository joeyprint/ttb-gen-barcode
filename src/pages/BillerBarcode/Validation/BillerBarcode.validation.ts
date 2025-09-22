import { z } from 'zod/v3';
import { BillCategory } from '../BillerBarcodeFormFields';

const NUMBER_REGEX = /^[0-9]*$/;
const ALPHABET_AND_NUMBER_REGEX = /^[a-zA-Z0-9]*$/;

const BILLER_ERROR_MESSAGES = {
  EMPTY_TAX_ID: 'กรุณากรอกเลขประจําตัวผู้เสียภาษี',
  MIN_TAX_ID: 'กรุณากรอกเลขประจําตัวผู้เสียภาษีให้ครบ',
  MAX_TAX_ID: 'กรุณากรอกเลขประจําตัวผู้เสียภาษีให้ครบ',

  EMPTY_SUFFIX_TAX_ID: 'กรุณากรอก suffix เลขประจําตัวผู้เสียภาษี',
  LIMIT_SUFFIX_TAX_ID: 'กรุณาระบุเลข suffix 2 หลัก',

  CREDIT_CARD_NOT_MATCHED: 'กรุณากรอกเลขบัตรเครดิตให้ถูกต้อง',

  FORMATTED_ALPHABET_AND_NUMBER:
    'กรุณากรอกเป็นตัวเลข หรือตัวอักษรภาษาอังกฤษเท่านั้น',
  FORMATTED_ONLY_NUMBER: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
};

export const billerBarcodeSchema = z
  .object({
    billCategory: z.object({
      label: z.string(),
      value: z.nativeEnum(BillCategory),
    }),
    taxId: z
      .string()
      .nonempty({ message: BILLER_ERROR_MESSAGES.EMPTY_TAX_ID })
      .regex(NUMBER_REGEX, {
        message: BILLER_ERROR_MESSAGES.FORMATTED_ONLY_NUMBER,
      })
      .min(13, { message: BILLER_ERROR_MESSAGES.MIN_TAX_ID })
      .max(13, { message: BILLER_ERROR_MESSAGES.MAX_TAX_ID }),
    suffixTaxId: z
      .string()
      .nonempty({ message: BILLER_ERROR_MESSAGES.EMPTY_SUFFIX_TAX_ID })
      .regex(NUMBER_REGEX, {
        message: BILLER_ERROR_MESSAGES.FORMATTED_ONLY_NUMBER,
      })
      .min(2, { message: BILLER_ERROR_MESSAGES.LIMIT_SUFFIX_TAX_ID })
      .max(2, { message: BILLER_ERROR_MESSAGES.LIMIT_SUFFIX_TAX_ID }),
    ref1: z
      .string()
      .regex(ALPHABET_AND_NUMBER_REGEX, {
        message: BILLER_ERROR_MESSAGES.FORMATTED_ALPHABET_AND_NUMBER,
      })
      .optional(),
    ref2: z
      .string()
      .regex(ALPHABET_AND_NUMBER_REGEX, {
        message: BILLER_ERROR_MESSAGES.FORMATTED_ALPHABET_AND_NUMBER,
      })
      .optional(),
    amount: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { billCategory, ref1 } = data;

    switch (billCategory.value) {
      case BillCategory.CreditCard: {
        if (!ref1 && ref1?.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: BILLER_ERROR_MESSAGES.FORMATTED_ONLY_NUMBER,
            path: ['ref1'],
          });
        }
        if (ref1 && !NUMBER_REGEX.test(ref1)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: BILLER_ERROR_MESSAGES.FORMATTED_ONLY_NUMBER,
            path: ['ref1'],
          });
        }
        if (!ref1 || ref1.length !== 16) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: BILLER_ERROR_MESSAGES.CREDIT_CARD_NOT_MATCHED,
            path: ['ref1'],
          });
        }
        break;
      }
      case BillCategory.AutoLoan:
      case BillCategory.Biller:
      default:
        break;
    }
  });
