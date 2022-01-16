import { BigInt } from "@graphprotocol/graph-ts"
import { Timeout, CallFunction, Executed } from "../generated/Timeout/Timeout"
import { FunctionEntity } from "../generated/schema"

export function handleCallFunction(event: CallFunction): void {
  let entity = new FunctionEntity(event.params.id.toHex());
  entity.functionId = event.params.id;
  entity.blockStart = event.params.blockStart;
  entity.blockEnd = event.params.blockEnd;
  entity.value = event.params.value;
  entity.executed = false;
  entity.save()
}

export function handleExecuted(event: Executed): void {
  let entity = new FunctionEntity(event.params.id.toHex());
  entity.executed = true;
  entity.save();
}
