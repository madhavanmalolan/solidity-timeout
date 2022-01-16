// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class FunctionEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("functionId", Value.fromBigInt(BigInt.zero()));
    this.set("blockStart", Value.fromBigInt(BigInt.zero()));
    this.set("blockEnd", Value.fromBigInt(BigInt.zero()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FunctionEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save FunctionEntity entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("FunctionEntity", id.toString(), this);
    }
  }

  static load(id: string): FunctionEntity | null {
    return changetype<FunctionEntity | null>(store.get("FunctionEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get functionId(): BigInt {
    let value = this.get("functionId");
    return value!.toBigInt();
  }

  set functionId(value: BigInt) {
    this.set("functionId", Value.fromBigInt(value));
  }

  get blockStart(): BigInt {
    let value = this.get("blockStart");
    return value!.toBigInt();
  }

  set blockStart(value: BigInt) {
    this.set("blockStart", Value.fromBigInt(value));
  }

  get blockEnd(): BigInt {
    let value = this.get("blockEnd");
    return value!.toBigInt();
  }

  set blockEnd(value: BigInt) {
    this.set("blockEnd", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get executed(): boolean {
    let value = this.get("executed");
    return value!.toBoolean();
  }

  set executed(value: boolean) {
    this.set("executed", Value.fromBoolean(value));
  }
}
