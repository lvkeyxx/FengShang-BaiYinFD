package com.utility;

import sun.misc.BASE64Decoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Encryption {
	
	private final static String key = "ipacsbj.ipacsbj.";
	private final static String iv = "ipacsbj.ipacsbj.";
	private final static String Algorithm = "AES";
	private final static String MODE = "AES/CBC/NoPadding";
	
	public static void main(String args[]) throws Exception {
		
		String str = encrypt("ifsapp");
		System.out.println("encrypted: " + str);
		System.out.println("decrypted: " + desEncrypt(str).trim());
	}

	public static String encrypt(String data) throws Exception {
		try {
			Cipher cipher = Cipher.getInstance(MODE);
			int blockSize = cipher.getBlockSize();
			byte[] dataBytes = data.getBytes();
			int plaintextLength = dataBytes.length;
			if (plaintextLength % blockSize != 0) {
				plaintextLength = plaintextLength
						+ (blockSize - (plaintextLength % blockSize));
			}
			byte[] plaintext = new byte[plaintextLength];
			System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);
			SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), Algorithm);
			IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
			cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);
			byte[] encrypted = cipher.doFinal(plaintext);
			return new sun.misc.BASE64Encoder().encode(encrypted);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String desEncrypt(String encrypted) throws Exception {
		try {
			String data = encrypted;
			byte[] encrypted1 = new BASE64Decoder().decodeBuffer(data);
			Cipher cipher = Cipher.getInstance(MODE);
			SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), Algorithm);
			IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
			cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);
			byte[] original = cipher.doFinal(encrypted1);
			String originalString = new String(original);
			return originalString;
		} catch (Exception e) {
			e.printStackTrace();
			return "Password is not a valid string";
		}
	}
}
