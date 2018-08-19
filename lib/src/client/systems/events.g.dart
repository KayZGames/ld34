// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'events.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$InputHandlingSystem extends GenericInputHandlingSystem {
  Mapper<Thruster> thrusterMapper;
  Mapper<Player> playerMapper;
  CameraManager cameraManager;
  _$InputHandlingSystem() : super(Aspect.empty()..allOf([Thruster, Player]));
  @override
  void initialize() {
    super.initialize();
    thrusterMapper = Mapper<Thruster>(world);
    playerMapper = Mapper<Player>(world);
    cameraManager = world.getManager<CameraManager>();
  }
}
