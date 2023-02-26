import { Contract } from "ethers";
import { network, ethers } from "hardhat";

export const fundErc20 = async (
  contract: Contract,
  sender: string,
  recepient: string,
  amount: string
) => {
  const FUND_AMOUNT = ethers.utils.parseUnits(amount, 18);
  // fund erc20 token to the contract
  const whale:any = await ethers.provider.getSigner(sender);

  const contractSigner = contract.connect(whale);
  await contractSigner.transfer(recepient, FUND_AMOUNT);
};

export const impersonateFundErc20 = async (
  contract: Contract,
  sender: string,
  recepient: string,
  amount: string
) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sender],
  });

  // fund baseToken to the contract
  await fundErc20(contract, sender, recepient, amount);
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [sender],
  });
};
