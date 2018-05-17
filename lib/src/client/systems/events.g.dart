// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'events.dart';

// **************************************************************************
// Generator: SystemGenerator
// **************************************************************************

abstract class _$InputHandlingSystem extends GenericInputHandlingSystem {
  Mapper<Thruster> thrusterMapper;
  Mapper<Player> playerMapper;
  CameraManager cameraManager;
  _$InputHandlingSystem()
      : super(new Aspect.empty()..allOf([Thruster, Player]));
  @override
  void initialize() {
    super.initialize();
    thrusterMapper = new Mapper<Thruster>(Thruster, world);
    playerMapper = new Mapper<Player>(Player, world);
    cameraManager = world.getManager(CameraManager);
  }
}
